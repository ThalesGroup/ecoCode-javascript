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
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Detect empty src attribute in image tags",
      category: "eco-design",
      recommended: "warn",
    },
    messages: {
      EmptyImageSrc: 'Image tag has an empty src attribute',
    },
    schema: [],
  },
  create: function (context) {
    return {
      JSXOpeningElement(node) {
        if(node.name.name === "img"){
          const srcAttribute = node.attributes.find(
            (attribute) =>
            attribute.type === "JSXAttribute" &&
            attribute.name.name === "src"
          );
          if(
            srcAttribute &&
            srcAttribute.value &&
            srcAttribute.value.expression &&
            srcAttribute.value.expression.value === ""
          ){
            context.report({
              node,
              messageId: "EmptyImageSrc",
            });
          }
        }
      },
    };
  },
};