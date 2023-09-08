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
      description: '"switch" statements should have at least 3 "case" clauses',
      category: "eco-design",
      recommended: "warn",
    },
    messages: {
        smallSwitch: '"switch" statements should have at least 3 "case" clauses',
    },
    schema: [],
  },
  create: function (context) {
    return {
        SwitchStatement(node) {
            const switchStatement = node;
            const { cases } = switchStatement;
            const hasDefault = cases.some(x => !x.test);
            if (cases.length < 2 || (cases.length === 2 && hasDefault)) {
                const firstToken = context.getSourceCode().getFirstToken(node);
                if (firstToken) {
                    context.report({
                        messageId: 'smallSwitch',
                        loc: firstToken.loc,
                    });
                }
            }
        },
    };
  },
};