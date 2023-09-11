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
      description: '"switch" statements should not have too many "case" clauses',
      category: "eco-design",
      recommended: "warn",
    },
    messages: {
      reduceNumberOfNonEmptySwitchCases:  'Reduce the number of non-empty switch cases from {{numSwitchCases}} to at most {{maxSwitchCases}}.',
    },
    schema: [
    {
        type: 'integer',
        minimum: 0,
    },
    ],
  },


  create: function (context) {
    let maxSwitchCases = 30;

    if (context.options.length > 0) {
        maxSwitchCases = context.options[0];
    }
    return {
        SwitchStatement: (node) =>
        visitSwitchStatement(node, context),
    };
  },
};

function visitSwitchStatement(
  switchStatement,
  context
) {
  const nonEmptyCases = switchStatement.cases.filter(
  switchCase => switchCase.consequent.length > 0 && !isDefaultCase(switchCase),
  );
  if (nonEmptyCases.length > maxSwitchCases) {
    const switchKeyword = context.getSourceCode().getFirstToken(switchStatement);
    context.report({
      messageId: 'reduceNumberOfNonEmptySwitchCases',
      loc: switchKeyword.loc,
      data: {
        numSwitchCases: nonEmptyCases.length.toString(),
        maxSwitchCases: maxSwitchCases.toString(),
      },
    });
  }
}

function isDefaultCase(switchCase) {
  return switchCase.test === null;
}