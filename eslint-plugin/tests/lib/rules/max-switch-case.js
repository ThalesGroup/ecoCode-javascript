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

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/max-switch-case");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const expectedError = {
  messageId: "reduceNumberOfNonEmptySwitchCases",
  type: "Property",
};

ruleTester.run("max-switch-case", rule, {
   valid: [
      {
        code: `switch(i) {
        case 1:
          f();
        case 2:
          g();
      }`,
      },
      {
        code: `switch(i) {
        case 1:
          f();
        case 2:
          g();
        default:
          console.log("foo");
      }`,
        options: [2],
      },
      {
        code: `switch(i) {
        case 1:
        case 2:
          g();
        case 3:
          console.log("foo");
      }`,
        options: [2],
      },
      {
        code: `switch(i) {}`,
      },
    ],
    invalid: [
      {
        code: `switch(i) {
          case 1:
            f();
          case 2:
            g();
        }`,
        options: [1],
        errors: [
          {
            messageId: 'reduceNumberOfNonEmptySwitchCases',
            data: {
              numSwitchCases: 2,
              maxSwitchCases: 1,
            },
            line: 1,
            endLine: 1,
            column: 1,
            endColumn: 7,
          },
        ],
      },
    ],
});