# <h1 align="center">config-resolver</h1>

<p align="center">
  A function that resolves a config file and returns its content, or null if not found.
</p>
 [![npm][npm-badge]][npm-url] [![Build][travis-badge]][travis-url] [![Coverage Status][coverage-badge]][coverage-url]

## Table of Contents

-   [About](#about)
    -   [How to install](#how-to-install)
-   [Getting started](#getting-started-examples)
    -   [Example: JSON config file](#example-json-config-file)
    -   [Example: config file exporting a JS function](#example-JavaScript-function-config-file )
    -   [Example: JavaScript config file exporting a JSON object](#EXAMPLE-JavaScript-config-file-exporting-a-JSON-object)
    -   [Example: Loading a config file from one of several places or formats](#EXAMPLE-Loading-a-config-file-from-one-of-several-places-or-formats)
-   [Contributing and Internal Documentation](#contributing-and-internal-documentation)

## About

Reading a config file is a pretty standard operation for just about any node project. The config-resolver provides a function to avoid repeating the same boilerplate config-loading code in every project.

### How to install

The following commands will install config-resolver:

```shell
npm install --save-dev @auturge/config-resolver
```

or

```shell
yarn add @auturge/config-resolver --dev
```

## Getting Started (Examples)

config-resolver supports JavaScript or JSON config files.

The following examples assume the project has this shape:

```none
demo
├── conf/
│   ├── config.json
│   ├── config.js
│   └── config.export.js
│
├── src/
│   ├── index.js
```

---

### EXAMPLE: JSON config file

#### config.json

```JSON
{
        source: './package.json',
        destination: './build/package.json',
        keeplist: ['name', 'version'],
        loglevel: 'INFO',
}
```

#### index.js

```JavaScript
const path = require('path')
const { resolveConfig } = require('@auturge/config-resolver')

const options = {
    explicit: {
        path: path.resolve(__dirname, '../conf/demo.config.json'),
        type: 'json',
    },
}
const config = resolveConfig(options)

console.log(JSON.stringify(config, undefined, 2))
```

#### result

```JSON
{
  "source": "./package.json",
  "destination": "./build/package.json",
  "keeplist": [
    "name",
    "version"
  ],
  "loglevel": "INFO"
}
```

---

### EXAMPLE: JavaScript function config file

#### config.js

```JavaScript
module.exports = (env) => {
    const isProd = env && env['prod'] === true

    const DESTINATION = './build/{0}/package.json'.replace(
        '{0}', isProd ? 'prod' : 'dev'
    )

    const config = {
        source: './package.json',
        destination: DESTINATION,
        keeplist: ['name', 'version'],
        loglevel: 'INFO',
    }

    return config
}
```

#### index.js

```JavaScript
const path = require('path')
const { resolveConfig } = require('@auturge/config-resolver')

const env = { prod: true }
const options = {
    explicit: {
        path: path.resolve(__dirname, '../conf/demo.config.js'),
        type: 'function',
    },
}
const configFunction = resolveConfig(options)
const config = configFunction(env)

console.log(JSON.stringify(config, undefined, 2))
```

#### result

```JSON
{
  "source": "./package.json",
  "destination": "./build/prod/package.json",
  "keeplist": [
    "name",
    "version"
  ],
  "loglevel": "INFO"
}
```

---

### EXAMPLE: JavaScript config file exporting a JSON object

#### config.export.js

```JavaScript
module.exports = {
    source: './package.json',
    destination: './build/package.json',
    keeplist: ['name', 'version'],
    loglevel: 'INFO',
}
```

#### index.js

```JavaScript
const path = require('path')
const { resolveConfig } = require('@auturge/config-resolver')

const env = { prod: true }
const options = {
    explicit: {
        path: path.resolve(__dirname, '../conf/demo.config.js'),
        type: 'json',
    },
}
const config = resolveConfig(options)

console.log(JSON.stringify(config, undefined, 2))
```

#### result

```JSON
{
  "source": "./package.json",
  "destination": "./build/package.json",
  "keeplist": [
    "name",
    "version"
  ],
  "loglevel": "INFO"
}
```

---

### EXAMPLE: Loading a config file from one of several places or formats

Suppose you want to allow users to place their config files in one of several places, or support multiple formats. Say you want to search for config files with the following precedence (where higher on the list is where we look first):

```none
./.trimrc		or	 	./trim.config.js,
./conf/.trimrc 	or		./conf/trim.config.js
./conf/demo.config.js
./conf/demo.config.json
```

#### index.js

```JavaScript
const path = require('path')
const { resolveConfig } = require('@auturge/config-resolver')

const env = { prod: true }
const options = {
    alternatives: [
        {
			// another file that does not exist in our demo
			path: './.trimrc', type: 'json'
        },
        {
			// a file that does not exist in our demo
			path: './trim.config.js', type: 'function',
			priority: 0
        },
        {
			// a file that does not exist in our demo
			path: './conf/trim.config.js', type: 'function',
			priority: 1
        },
        {
			// another file that does not exist in our demo
			path: './conf/.trimrc', type: 'json',
			priority: 1
        },
        {
            path: './conf/demo.config.js'), type: 'function',
            priority: 2
        },
{
            path: './conf/demo.config.json'), type: 'json',
            priority: 3
        },
    ],
}
const config = resolveConfig(options)

console.log(JSON.stringify(config, undefined, 2))
```

#### result

Using the above code, config-resolver would find and attempt to load `./conf/demo.config.js`.

---

## Contributing and Internal Documentation

The auturge family welcomes any contributor, small or big. We are happy to elaborate, guide you through the source code and find issues you might want to work on! To get started have a look at our [documentation on contributing][contributing].

[contributing]: https://github.com/auturge/config-resolver/blob/master/docs/CONTRIBUTING.md
[npm-badge]: https://img.shields.io/npm/v/@auturge/config-resolver.svg
[npm-url]: https://www.npmjs.com/package/@auturge/config-resolver
[travis-badge]: https://api.travis-ci.com/auturge/config-resolver.svg?branch=master
[travis-url]: https://travis-ci.com/github/auturge/config-resolver
[coverage-badge]: https://coveralls.io/repos/github/auturge/config-resolver/badge.svg
[coverage-url]: https://coveralls.io/github/auturge/config-resolver
