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

const rule = require("../../../lib/rules/elseif-without-else");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
});
const expectedError = {
  messageId: 'IfStatement',
};

ruleTester.run("elseif-without-else", rule, {
  valid: [
    {
      code: `
      if (x == 0) {
        x = 42;
      }
      `,
    },
    {
      code: `
      if (x == 0)
        x = 42;
      `,
    },
    {
      code: `
      if (x == 0) {
        x = 42;
      } else {
        x = -42;
      }
      `,
    },
    {
      code: `
      if (x == 0)
        x = 42;
      else
        x = -42;
      `,
    },
    {
      code: `
      if (x == 0) {
        x == 42;
      } else {
        if (x == 1) {
          x == -42;
        }
      }
      `,
    },
  ],
  invalid: [
    {
      code: `
      if (x == 0) {
        x = 42;
      } else if (x == 1) {
        x = -42;
      } else if (x == 2) {
        x = 0;
      }
      `,
      errors: [
        {
          messageId: 'IfStatement',
          line: 6,
          endLine: 6,
          column: 9,
          endColumn: 16,
        },
      ],
    },
    {
      code: `
      if (x == 0)
        x == 42;
      else
        if (x == 1)
          x == -42;
      `,
      errors: [
        {
          messageId: 'IfStatement',
          line: 4,
          endLine: 5,
          column: 7,
          endColumn: 11,
        },
      ],
    },
  ],
});