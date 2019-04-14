# express

[![CircleCI](https://circleci.com/gh/js-items/express.svg?style=svg)](https://circleci.com/gh/js-items/express)
[![codecov](https://codecov.io/gh/js-items/express/branch/master/graph/badge.svg)](https://codecov.io/gh/js-items/express)
![GitHub tag (latest SemVer)](https://img.shields.io/github/tag/js-items/express.svg)
![jscpd](assets/jscpd-badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/js-items/express/badge.svg?targetFile=package.json)](https://snyk.io/test/github/js-items/express?targetFile=package.json)

express.js implementation of js-items

There is a fantastic alternative to this project (and @js-items/express is based on it):
[js-entity-repos/express](https://github.com/js-entity-repos/express).

The main differences to the @js-entity-repos/express:

- different naming convention: using `item` instead of `entity`
- cursor based pagination operates using `before` and `after` instead of `cursor` and `direction`
- `enveloping` response (GET /items) which allows client to more easily discover the pagination and metadata
- `granular transactions handlers` for each `request handler` - this could be used for i.e. `authentication` or `permissions` checks
- possibility to `override` each `request handler`
- ability to disable json body parser middleware if already present in the stack (`enableJsonBodyParser: false`)
- replaced /count path with optional header available on get request

## Installation:

`npm i @js-items/express --save`

Credits:

- [ryansmith94](https://github.com/ryansmith94)
- [best-practices-for-a-pragmatic-restful-api](https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)
