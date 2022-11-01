# @adopisoft/remove-if-env

Remove blocks of code base on Nodes.js' process.env

This is a [ttypescript](https://www.npmjs.com/package/typescript) plugin that removes block of codes base on `process.env`.

---

## Installation

Requires `ts-node` and `ttypescript` to be installed.

With NPM:
```

npm i @adopisoft/remove-if-env --save-dev
```
OR with YARN:
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
// NOTE: This variable name 'removeIfEnv' must match the value of plugin option 'envVar'.
// Please also see the section about creating the './remove-if-env.ts' file below.
import removeIfEnv from './remove-if-env'

if (removeIfEnv.PROD) {
  console.log(
    'This code block executes in development but will be striped out \
      when compiling with PROD=true ttsc'
  )
}
```


## Creating the `removeIfEnv` file

The `removeIfEnv` file is used for your local typescript completion only and to make sure the codes inside the if statement can execute locally. To do this, we have to create the file `./remove-if-env.ts` which contains placeholder values for the `process.env.*` properties:

`./remove-if-env.ts`

```js

export default {
  PROD: true
}
```



## Plugin Options

**envVar** - Set the variable name of `removeIfEnv` object to be used in your codes. If not set, default is `removeIfEnv`.



## Compiling Your Code
To strip off the if statement blocks during compilation, we must set the environment variables to one of the following values - `1`, `yes`, or `true`.
```
$ export PROD=1
$ npx ttsc
```



## Project Status

This project is very much still a WIP altough this is enough for our internal tooling requirements.
We will follow proper semantic versioning to avoid breaking changes for other consumers.
PRs are always welcome if you want to improve this tool.



## License

[MIT LICENSE](./LICENSE.txt)

