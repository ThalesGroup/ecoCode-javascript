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

const rule = require("../../../lib/rules/optimize-database-queries");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const expectedError = {
	messageId: "OptimizeDatabaseQueries"
};

ruleTester.run("optimize-database-queries", rule, {
	valid: [
		`
        query("SELECT raison_social, adresse, code_postal, telephone FROM clients LIMIT 50");
        `,
        `
        var query = "SELECT raison_social, adresse, code_postal, telephone FROM clients LIMIT 10";
        `,
	],

	invalid: [
        {
          code: 'query("SELECT raison_social, adresse, code_postal, telephone FROM clients ");',
          errors: [expectedError],
        },
        {
          code: 'var query = "SELECT raison_social, adresse, code_postal, telephone FROM clients";',
          errors: [expectedError],
        },
	],
});