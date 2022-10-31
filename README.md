# @adopisoft/remove-if-env

Remove blocks of code base on Nodes.js' process.env

This is a [ttypescript](https://www.npmjs.com/package/typescript) plugin that removes block of codes base on `process.env`.

---

## Status

This project is very much still a WIP, enough for our internal tooling requirements. But we will follow proper semantic versioning to avoid breaking changes. PRs are always welcome if you want to improve this tool.

## Installation

```
# Requires 'ts-node' and 'ttypescript' to be installed

npm i @adopisoft/remove-if-env --save-dev
```
OR
```
# Requires 'ts-node' and 'ttypescript' to be installed

yarn add @adopisoft/remove-if-env -D
```

## Usage

`./tsconfig.json`

```json
{
  "ts-node": {
    "compiler": "ttypescript"
  },
  "compilerOptions": {
    "plugins": [
      {
        "transform": "@adopisoft/remove-if-env",
        "envVar": "removeIfEnv"
      }
    ]
  }
}

```

`./sample-source.ts`

```js
import removeIfEnv from './remove-if-env'

if (removeIfEnv.NODE_ENV === 'production') {
  console.log('This block will be removed in production!')
}
```

`./remove-if-env.ts`
```js
/* 
Use this file to prevent linting error for undefined variable 'removeIfEnv' 
and provide code completion. 
*/

export default {
  NODE_ENV: process.env.NODE_ENV
}
```

Compilation:
```
$ export NODE_ENV=production
$ npx ttsc
```

---

## License

MIT
