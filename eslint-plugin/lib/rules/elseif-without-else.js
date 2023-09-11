/**
 * Copyright (C) 2023 Green Code Initiative
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";

/** @type {import("eslint").Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Add Missing Else when you call a if",
      category: "eco-design",
      recommended: "warn",
    },
    messages: {
      IfStatement: "addMissingElseClause",
    },
    schema: [],
  },
  create: function (context) {
    return {
     IfStatement: (node) => {
        const ifstmt = node;
        if (isElseIf(ifstmt) && !ifstmt.alternate) {
            const sourceCode = context.getSourceCode();
            const elseKeyword = sourceCode.getTokenBefore(
            node,
            token => token.type === 'Keyword' && token.value === 'else',
            );
            const ifKeyword = sourceCode.getFirstToken(
            node,
            token => token.type === 'Keyword' && token.value === 'if',
            );
            context.report({
            messageId: 'IfStatement',
            loc: {
                start: elseKeyword.loc.start,
                end: ifKeyword.loc.end,
            },
            });
        }
     },
    };
  },
};

function isElseIf(node) {
  const { parent } = node;
  return parent?.type === 'IfStatement' && parent.alternate === node;
}

