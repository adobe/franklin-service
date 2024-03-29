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
import init from '@adobe/create-franklin-library';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line no-console
console.log('Creating a new Franklin Service');
init(resolve(fileURLToPath(import.meta.url), '..'), {
  'package.json': (buf, answers) => {
    const json = JSON.parse(buf.toString());
    json.name = answers.fullscope;
    json.description = answers.title;
    json.repository.url = `https://github.com/${answers.fullname}`;
    json.bugs.url = `https://github.com/${answers.fullname}/issues`;
    json.homepage = `https://github.com/${answers.fullname}#readme`;

    json.wsk.name = `helix-services/${answers.name.replace(/franklin-/, '')}@\${version}`;

    delete json.files;

    return Buffer.from(JSON.stringify(json, null, 2));
  },
  'README.md': (buf, answers) => {
    const shortname = answers.name.replace('helix-', '');
    const updated = buf.toString()
      .replace(/@adobe\/helix-service/g, answers.fullscope)
      .replace(/Franklin Service/g, answers.title)
      .replace(/An example service to be used in and with Project Franklin/g, answers.description)
      .replace(/franklin-services\/service/g, `franklin-services/${shortname}`)
      .replace(/adobe\/franklin-service/g, answers.fullname);
    return Buffer.from(updated);
  },
  'dot-releaserc.cjs': (buf) => buf,
  'dot-github/workflows/main.yaml': (buf) => buf,
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
