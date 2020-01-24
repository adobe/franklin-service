/*
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
const { wrap } = require('@adobe/openwhisk-action-utils');
const { logger } = require('@adobe/openwhisk-action-logger');
const { wrap: status } = require('@adobe/helix-status');
const { epsagon } = require('@adobe/helix-epsagon');

/**
 * This is the main function
 * @param {string} name name of the person to greet
 * @returns {object} a greeting
 */
function main({ name = 'world' }) {
  return {
    body: `Hello, ${name}.`,
  };
}

module.exports.main = wrap(main)
  .with(epsagon)
  .with(status)
  .with(logger.trace)
  .with(logger);
