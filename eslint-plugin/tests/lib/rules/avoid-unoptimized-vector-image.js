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

const rule = require("../../../lib/rules/avoid-unoptimized-vector-image");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const expectedError = {
  messageId: "AvoidUnoptimizedVectorImages",
  type: "Literal",
};

ruleTester.run("avoid-unoptimized-vector-image", rule, {
  valid: [
    {
        code:`
            var svg = 'test/image.svg';

        `,
    },

    {
        code:`
        function testImage(image){
            return "path/to/" + image;
        }

        var format = testImage("image.svg");

        `,
    },

    {
        code:`
        var imageSVG = "<html><svg width='100' height='100'>" + "<circle cx='50' cy='50' r='40' stroke='green' stroke-width='4' fill='yellow' />" + "</svg></html>";
        `,
    },

    {
        code:`
        function testImageFormat2(){
            return "<html><img src='xx/xx/image.svg' >" + "</html>" ;
        }
        `,
    },


  ],

  invalid: [
    {
      code: `
      var svg = '<svg>...</svg>';
     `,
      errors: [expectedError],
    },
    {
      code: `
      var svg = '<svg><g>...</g></svg>';
     `,
      errors: [expectedError],
    },

    {
        code: `
        var svg = '<svg><!-- ... --></svg>';
       `,
        errors: [expectedError],
    },

    {
        code: `
        var svg = '<svg xmlns:custom="...">...</svg>';
       `,
        errors: [expectedError],
    },
    {
        code: `
        var svg = '<svg><metadata>...</metadata></svg>';

       `,
        errors: [expectedError],
    },

  ],
});