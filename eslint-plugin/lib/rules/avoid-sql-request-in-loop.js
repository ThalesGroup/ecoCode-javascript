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
			AvoidSQLRequestInLoop: "AvoidSQLRequestInLoop",
		},
		schema: [],
	},
	create: function (context) {
		return {
			WhileStatement(node) {
				if (node && node.body && node.body.type === 'BlockStatement') {
				    node.body.body.forEach(statement => {
				        if (
                            statement.type === 'ExpressionStatement' &&
                            statement.expression.type === 'CallExpression'
				        ) {
				             const callee = statement.expression.callee;

				             if (callee.name === 'query') {
				                context.report({ node, messageId: "AvoidSQLRequestInLoop" });
				             }
				        }
				    });
				}
			},
			ForStatement(node) {
                if (node && node.body && node.body.type === 'BlockStatement') {
                    node.body.body.forEach(statement => {
                        if (
                            statement.type === 'ExpressionStatement' &&
                            statement.expression.type === 'CallExpression'
                        ) {
                             const callee = statement.expression.callee;

                             if (callee.name === 'query') {
                                context.report({ node, messageId: "AvoidSQLRequestInLoop" });
                             }
                        }
                    });
                }
            },
            DoWhileStatement(node) {
                if (node && node.body && node.body.type === 'BlockStatement') {
                    node.body.body.forEach(statement => {
                        if (
                            statement.type === 'ExpressionStatement' &&
                            statement.expression.type === 'CallExpression'
                        ) {
                             const callee = statement.expression.callee;

                             if (callee.name === 'query') {
                                context.report({ node, messageId: "AvoidSQLRequestInLoop" });
                             }
                        }
                    });
                }
            },
            ForInStatement(node) {
                if (node && node.body && node.body.type === 'BlockStatement') {
                    node.body.body.forEach(statement => {
                        if (
                            statement.type === 'ExpressionStatement' &&
                            statement.expression.type === 'CallExpression'
                        ) {
                             const callee = statement.expression.callee;

                             if (callee.name === 'query') {
                                context.report({ node, messageId: "AvoidSQLRequestInLoop" });
                             }
                        }
                    });
                }
            },
		};
	},
};