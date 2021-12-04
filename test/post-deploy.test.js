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
import chai from 'chai';
import chaiHttp from 'chai-http';
import { createTargets } from './post-deploy-utils.js';

chai.use(chaiHttp);
const { expect } = chai;

createTargets().forEach((target) => {
  describe(`Post-Deploy Tests (${target.title()})`, () => {
    it('Purge a blog post', async () => {
      await chai
        .request(target.host())
        .get(target.urlPath())
        .then((response) => {
          expect(response).to.have.status(200);
          expect.fail('Not ready yet');
        }).catch((e) => {
          throw e;
        });
    }).timeout(50000);
  });
});
