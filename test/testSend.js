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

/* eslint-env mocha */
const assert = require('assert');
const { AssertionError } = require('assert');
const util = require('../src/util.js');
const send = require('../src/sendquery.js');

describe('bigquery tests', () => {
  it('runs a query', async () => {
    const result = await send.execute(util.email, util.key, util.projectid, 'list-everything', '0bxMEaYAJV6SoqFlbZ2n1f');
    assert.ok(Array.isArray(result));
  }).timeout(5000);

  it('runs a query with params', async () => {
    const result = await send.execute(util.email, util.key, util.projectid, 'list-everything', '0bxMEaYAJV6SoqFlbZ2n1f', {
      limit: 10,
    });
    assert.ok(Array.isArray(result));
    assert.equal(result.length, 10);
  }).timeout(150000);

  it('throws without projectid', async () => {
    try {
      await send.execute(util.email, util.key, undefined, 'list-everything', '0bxMEaYAJV6SoqFlbZ2n1f');
      assert.fail('expected exception not thrown');
    } catch (e) {
      if (e instanceof AssertionError) {
        // bubble up the assertion error
        throw e;
      }
    }
  }).timeout(5000);

  it('throws with bad query', async () => {
    try {
      await send.execute(util.email, util.key, util.projectid, 'break-something', '0bxMEaYAJV6SoqFlbZ2n1f');
      assert.fail('expected exception not thrown');
    } catch (e) {
      if (e instanceof AssertionError) {
        // bubble up the assertion error
        throw e;
      }
    }
  }).timeout(5000);
});

describe('sql loading tests', () => {
  it('loadQuery loads a query', () => {
    const result = send.loadQuery('list-everything');
    assert.ok(result.match(/select/i));
  });
});
