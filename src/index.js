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

const { wrap } = require('@adobe/helix-status');
const { execute } = require('./sendquery');

function cleanParams(params){
  return Object.keys(params)
    .filter(key => !key.match(/[A-Z0-9_]+/))
    .filter(key => !key.startsWith('__'))
    .reduce((cleanedobj, key) => {
      cleanedobj[key] = params[key];
      return cleanedobj;
    }, {});
}

async function main(params) {
  try {
    const results = await execute(
      params.GOOGLE_CLIENT_EMAIL,
      params.GOOGLE_PRIVATE_KEY,
      params.GOOGLE_PROJECT_ID,
      params.__ow_path,
      cleanParams(params),
      params.service
    );
    return {
      headers: {
        'content-type': 'application/json'
      },
      body: {
        results
      }
    }
  } catch (e) {
    console.error(e);
    return {
      statusCode: e.statusCode || 500,
    };
  }
}

module.exports = { main: wrap(main) , cleanParams };
