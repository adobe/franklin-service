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
/* eslint-disable no-console */

const fs = require('fs');

const nextVersion = process.argv[2];
if (!nextVersion) {
  console.error('no version provided as argument.');
  process.exit(1);
}
console.log('------');
console.log('OpenWhisk: Prepare version %s', nextVersion);

const pkgJson = fs.readFileSync('package.json', 'utf-8');
const pkg = JSON.parse(pkgJson);
pkg.version = nextVersion;
pkg.wsk.name = `helix-services/${pkg.name.replace('@adobe/helix-', '')}@${nextVersion}`;

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2), 'utf-8');

console.log('Action name: %s', pkg.wsk.name);
console.log('updated package.json');
console.log('------');
