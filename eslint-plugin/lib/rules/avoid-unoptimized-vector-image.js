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

/** @type {import("eslint").Rule.RuleModule} */

const UNOPTIMIZED_SVG_REGEX = /<svg>[\s\S]*?<\/svg>/;
const MULTIPLE_LAYERS_SVG_REGEX = /<\/g>[\s\S]*?<g>/;
const COMMENTS_SVG_REGEX = /<!--[\s\S]*?-->/;
const NAMESPACE_SVG_REGEX = /xmlns:(?!svg=)/;
const METADATA_SVG_REGEX = /<metadata>[\s\S]*?<\/metadata>/;

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Avoid Unoptimized Vector Images",
      category: "eco-design",
      recommended: "true",
    },
    messages: {
      AvoidUnoptimizedVectorImages: "Avoid Unoptimized Vector Images",
    },
    fixable: null,
    schema: [],
  },
  create: function (context) {
    function checkSVG(stringLiteral){
        const value = stringLiteral.value;

        if(value.match(UNOPTIMIZED_SVG_REGEX)){
            context.report({
                node: stringLiteral,
                messageId: "AvoidUnoptimizedVectorImages",
            });
        } else if(value.match(MULTIPLE_LAYERS_SVG_REGEX)){
            context.report({
                node: stringLiteral,
                messageId: "AvoidUnoptimizedVectorImages",
            });
        } else if(value.match(COMMENTS_SVG_REGEX)){
            context.report({
                node : stringLiteral,
                messageId: "AvoidUnoptimizedVectorImages",
            });
        } else if(value.match(NAMESPACE_SVG_REGEX)){
            context.report({
                node: stringLiteral,
                messageId: "AvoidUnoptimizedVectorImages",
            });
        } else if(value.match(METADATA_SVG_REGEX)){
            context.report({
                node: stringLiteral,
                messageId: "AvoidUnoptimizedVectorImages",
            });
        }
    }
    return {
        Literal(node){
            if(typeof node.value === "string"){
                checkSVG(node);
            }
        },
    };
  },
};