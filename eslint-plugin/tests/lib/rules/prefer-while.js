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

const rule = require("../../../lib/rules/prefer-while");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
});

const message = 'replaceForWithWhileLoop';

ruleTester.run("prefer-while", rule, {
   valid: [
      {
      code: 'for(var i = 0; condition;) { }'
      },
      {
      code: 'for(var i = 0; condition; i++) { }'
      },
      {
      code: 'for(var i = 0;; i++) { }'
      },
      {
      code: 'for (i; condition; ) { }'
      },
      {
      code: 'for ( ; i < length; i++ ) { }'
      },
      {
      code: 'while (i < length) { }'
      },
      {
      code: 'for (a in b) { }'
      },
      {
      code: 'for (a of b) { }'
      },
      {
      code: 'for(;;) {}'
      },
    ],
    invalid: [
      {
        code: 'for(;condition;) {}',
        errors: [{ messageId: message, line: 1, column: 1, endColumn: 4 }],
        output: 'while (condition) {}',
      },
      {
        code: 'for (;condition; ) foo();',
        errors: [{ messageId: message }],
        output: 'while (condition) foo();',
      },
      {
        code: `
          for(;i < 10;)
            doSomething();`,
        errors: [{ messageId: message }],
        output: `
          while (i < 10)
            doSomething();`,
      },
    ],
});