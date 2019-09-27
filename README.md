# Helix Run Query
> An action that queries Google Bigquery
## Status
[![codecov](https://img.shields.io/codecov/c/github/adobe/helix-run-query.svg)](https://codecov.io/gh/adobe/helix-run-query)
[![CircleCI](https://img.shields.io/circleci/project/github/adobe/helix-run-query.svg)](https://circleci.com/gh/adobe/helix-run-query)
[![GitHub license](https://img.shields.io/github/license/adobe/helix-run-query.svg)](https://github.com/adobe/helix-run-query/blob/master/LICENSE.txt)
[![GitHub issues](https://img.shields.io/github/issues/adobe/helix-run-query.svg)](https://github.com/adobe/helix-run-query/issues)
[![LGTM Code Quality Grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/adobe/helix-run-query.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/adobe/helix-run-query)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Greenkeeper badge](https://badges.greenkeeper.io/adobe/helix-run-query.svg)](https://greenkeeper.io/)

## Installation

## Usage

```bash
curl https://adobeioruntime.net/api/v1/web/helix/helix-query-nextresource/helix-query@v1/list-everything?limit=20
```

For more, see the [API documentation](docs/API.md).

## Development

### Deploying Helix Static

Deploying Helix Service requires the `wsk` command line client, authenticated to a namespace of your choice. For Project Helix, we use the `helix` namespace.

All commits to master that pass the testing will be deployed automatically. All commits to branches that will pass the testing will get commited as `/helix-services/service@ci<num>` and tagged with the CI build number.
