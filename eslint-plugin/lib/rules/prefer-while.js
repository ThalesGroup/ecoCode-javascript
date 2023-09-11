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
      description: "A 'while' loop should be used instead of a 'for' loop",
      category: "eco-design",
      recommended: "warn",
    },
    messages: {
      replaceForWithWhileLoop: 'Replace this "for" loop with a "while" loop.',
    },
    schema: [],
    fixable: 'code',
  },
  create: function (context) {
     return {
        ForStatement(node) {
        const forLoop = node;
        const forKeyword = context.getSourceCode().getFirstToken(node);
            if (!forLoop.init && !forLoop.update && forLoop.test && forKeyword) {
                context.report({
                messageId: `replaceForWithWhileLoop`,
                loc: forKeyword.loc,
                fix: getFix(forLoop),
              });
            }
        },
     };

     function getFix(forLoop){
        const forLoopRange = forLoop.range;
        const closingParenthesisToken = context.getSourceCode().getTokenBefore(forLoop.body);
        const condition = forLoop.test;

        if (condition && forLoopRange && closingParenthesisToken) {
            return (fixer) => {
            const start = forLoopRange[0];
            const end = closingParenthesisToken.range[1];
            const conditionText = context.getSourceCode().getText(condition);
            return fixer.replaceTextRange([start, end], `while (${conditionText})`);
            };
        }
        return undefined;
     }
  },
};