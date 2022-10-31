# @adopisoft/ts-if-env

Remove blocks of code base on Nodes.js' process.env

---

## Status

This project is very much still a wip, enough for our internal tooling requirements. But we will follow proper semantic versioning to avoid breaking changes. PRs are always welcome if you want to improve this tool.

## Installation

```
# Requires ts-node and ttypescript also installed
$ npm i @adopisoft/ts-if-env --save-dev
```
OR
```
$ yarn add @adopisoft/ts-if-env -D
```

## Usage

`tsconfig.json`

```json
{
  "ts-node": {
    "compiler": "ttypescript"
  },
  "compilerOptions": {
    "plugins": [
      {
        "transform": "@adopisoft/ts-if-env",
        "env": ["NODE_ENV"]
      }
    ]
  }
}

```

`sample-source.ts`

```ts
if (process.env.NODE_ENV === 'production') {
  console.log('This block is gonna be removed!')
}

export default {}
```

Compilation:
```
NODE_ENV=production ttsc
```

Explanation:

This transformer plugin will read the enviroment variables defined in `env` option. If the compiler runtime env value matches the expression in the source, the code will be removed in the compiler output.

