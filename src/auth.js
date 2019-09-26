/*
 * Copyright 2018 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
const { google } = require('googleapis');


async function googleauth(email, key) {
  const credentials = {
    client_email: email,
    private_key: key,
  };

  const gauth = new google.auth.GoogleAuth({
    // Scopes can be specified either as an array or as a single, space-delimited string.
    scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/bigquery'],
    credentials,
  });

  await gauth.getClient();

  // verifying that the credentials are valid
  await gauth.getRequestHeaders(
    'https://iam.googleapis.com/v1/',
  );

  return gauth;
}

/**
 *
 * @param {String} email the email of the service account to use for all subsequent requests
 * @param {String} key the private key of the service account to use for all subsequent requests
 */
async function auth(email, key) {
  try {
    const credentials = {
      client_email: email,
      private_key: key,
    };

    await googleauth(email, key);

    return credentials;
  } catch (e) {
    throw new Error(`Invalid credentials. Make sure email is the Google Service 
Account email in the format <name>@<project>.iam.gserviceaccount.com and key is
the private key starting with -----BEGIN PRIVATE KEY-----. You can create a new
Service Account in the Google Cloud Platform Console under IAM.`);
  }
}

module.exports = {
  auth, googleauth,
};
