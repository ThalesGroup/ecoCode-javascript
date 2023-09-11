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

const rule = require("../../../lib/rules/use-loop-insteadof-reduce-foreach");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
});

const expectedError = {
  messageId: "UseLoopInsteadOfReduceOrForEach",
};

ruleTester.run("use-loop-insteadof-reduce-foreach", rule, {
  valid: [
    `
    for (let i = 0; i < cars.length; i++) {
      text += cars[i] + "<br>";
    }
    `,
    `
    for (let i = 0; i < 5; i++) {
      text += "The number is " + i + "<br>";
    }
    `,
    `
    let i = 2;
    let len = cars.length;
    let text = "";
    for (; i < len; i++) {
      text += cars[i] + "<br>";
    }
    `,
  ],
  invalid: [
    {
      code: `
    const fruits = ["apple", "orange", "cherry"];
    fruits.forEach(myFunction);
    `,
      errors: [expectedError],
    },

    {
     code: `
       const numbers = [15.5, 2.3, 1.1, 4.7];
       document.getElementById("demo").innerHTML = numbers.reduce(getSum, 0);

       function getSum(total, num) {
        return total + Math.round(num);
       }
     `,
       errors: [expectedError],
     },

    {
      code: `
        const numbers = [175, 50, 25];
        document.getElementById("demo").innerHTML = numbers.reduce(myFunc);

        function myFunc(total, num) {
        return total - num;
      }
    `,
      errors: [expectedError],
    },
  ],
});