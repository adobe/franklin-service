#!/usr/bin/env node
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
const init = require('@adobe/create-helix-library');
const yaml = require('yaml');

function setValue(node, val) {
  // eslint-disable-next-line no-param-reassign
  node.value.value = val;
}

// eslint-disable-next-line no-console
console.log('Creating a new Helix Service');
init(__dirname, {
  '.circleci/config.yml': (buf, answers) => {
    const doc = yaml.parseDocument(buf.toString());
    const [name, group, policy] = doc.contents.items
      .filter((item) => item.key.value === 'jobs')[0].value.items
      .filter((item) => item.key.value === 'semantic-release')[0].value.items
      .filter((item) => item.key.value === 'steps')[0].value.items
      .filter((item) => item.type === 'MAP' && item.items && item.items[0] && item.items[0].key.value === 'helix-post-deploy/monitoring')[0].items[0].value.items;

    setValue(name, answers.title);
    setValue(group, answers.alertgroup);
    setValue(policy, `${answers.alertgroup} Repeated Failure`);

    return Buffer.from(doc.toString());
  },
}, [
  {
    type: 'list',
    name: 'alertgroup',
    message: 'What kind of service is this?',
    choices: [
      'Development', 'Publishing', 'Delivery',
    ],
    default: 'Development',
  },
]);
