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
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*/
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/avoid-sql-request-in-loop");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const expectedError = {
	messageId: "AvoidSQLRequestInLoop"
};

ruleTester.run("avoid-sql-request-in-loop", rule, {
	valid: [
		`
		query("SELECT raison_social, adresse, code_postal, telephone FROM clients");
		`,
		`
        for (let pas = 0; pas < 5; pas++) {
            console.log('Hello');
        }
        `,
        `
        let i = 0;
         do {
           i += 1;
           console.log(i);
         } while (i < 5);
         `,
         `
         let n = 0;
         let x = 0;
         while (n < 3) {
           n++;
           x += n;
         }
         `,
         `
         let arr = [3, 5, 7];
         arr.toto = "coucou";

         for (let i in arr) {
           console.log(i); // affiche 0, 1, 2, "toto" dans la console
         }
         `,
	],

	invalid: [
		{
			code:
			`
			for (let pas = 0; pas < 5; pas++) {
			    query("SELECT raison_social, adresse, code_postal, telephone FROM clients");
            }
			`,
			errors: [expectedError],
		},
		{
            code:
            `
            let i = 0;
             do {
               i += 1;
               query("SELECT raison_social, adresse, code_postal, telephone FROM clients");
             } while (i < 5);
            `,
            errors: [expectedError],
        },
        {
            code:
            `
            let n = 0;
            while (n < 3) {
              n++;
              query("SELECT raison_social, adresse, code_postal, telephone FROM clients");
            }
            `,
            errors: [expectedError],
        },
        {
            code:
            `
            let arr = [3, 5, 7];

            for (let i in arr) {
              query("SELECT raison_social, adresse, code_postal, telephone FROM clients");
            }
            `,
            errors: [expectedError],
        },
	],
});