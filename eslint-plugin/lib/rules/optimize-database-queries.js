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

/** @type {import("eslint").Rule.RuleModule} */
module.exports = {
	meta: {
		type: "suggestion",
		docs: {
			description: "",
			category: "eco-design",
			recommended: "warn",
		},
		messages: {
			OptimizeDatabaseQueries: "Optimize Database Queries",
		},
		schema: [],
	},
	create: function (context) {
		return {
			CallExpression(node) {
				if (
				    node &&
                    node.callee.name === 'query' &&
                    node.arguments.length > 0 &&
                    typeof node.arguments[0].value === 'string' &&
                    node.arguments[0].value.toLowerCase().includes('select') &&
                    node.arguments[0].value.toLowerCase().includes('from') &&
                    !node.arguments[0].value.toLowerCase().includes('limit')
				) {
					context.report({ node, messageId: "OptimizeDatabaseQueries" });
				}
			},
			VariableDeclarator(node) {
                if (
                    node &&
                    node.init &&
                    typeof node.init.value === 'string' &&
                    node.init.value.toLowerCase().includes('select') &&
                    node.init.value.toLowerCase().includes('from') &&
                    !node.init.value.toLowerCase().includes('limit')
                ) {
                    context.report({ node, messageId: "OptimizeDatabaseQueries" });
                }
            },
		};
	},
};