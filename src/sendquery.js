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
const { BigQuery } = require('@google-cloud/bigquery');
const { auth } = require('./auth.js');
const fs = require('fs-extra');
const path = require('path');

function loadQuery(query){
  return fs.readFileSync(path.resolve(__dirname, 'queries', query + '.sql')).toString();
}

/**
 *
 * @param {string} email email address of the Google service account
 * @param {string} key private key of the global Google service account
 * @param {string} project the Google project ID
 * @param {string} query the query from a .sql file
 */
async function execute(email, key, project, query, service, params = {
  limit: 100
}) {
  try {
    const credentials = await auth(email, key);
    const bq = new BigQuery({
      projectId: project,
      credentials,
    });
    const [dataset] = await bq.dataset('helix_logging_' + service, {
      location: 'US'
    }).get();

    return new Promise((resolve, reject) => {
      const results = [];

      dataset.createQueryStream({
        query: loadQuery(query),
        maxResults: params.limit,
        params
      })
      .on('data', row => results.push(row))
      .on('error', e => reject(e))
      .on('end', () => resolve(results));
    });
  } catch (e) {
    //console.error(e);
    throw e;
  }
}

module.exports = { execute, loadQuery };
