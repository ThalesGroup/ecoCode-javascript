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

const rule = require("../../../lib/rules/avoid-small-switch");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const expectedError = {
  messageId: "smallSwitch",
  type: "Property",
};

ruleTester.run("avoid-small-switch", rule, {
   valid: [
      { code: 'switch (a) { case 1: case 2: break; default: doSomething(); break; }' },
      { code: 'switch (a) { case 1: break; default: doSomething(); break; case 2: }' },
      { code: 'switch (a) { case 1: break; case 2: }' },
    ],
    invalid: [
      {
        code: 'switch (a) { case 1: doSomething(); break; default: doSomething(); }',
        errors: [
          {
            messageId: 'smallSwitch',
            column: 1,
            endColumn: 7,
          },
        ],
      },
      {
        code: 'switch (a) { case 1: break; }',
        errors: [
          {
            messageId: 'smallSwitch',
            column: 1,
            endColumn: 7,
          },
        ],
      },
      {
        code: 'switch (a) {}',
        errors: [
          {
            messageId: 'smallSwitch',
            column: 1,
            endColumn: 7,
          },
        ],
      },
    ],
});