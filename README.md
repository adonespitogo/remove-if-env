# @adopisoft/remove-if-env

A `typescript` transform plugin that removes blocks of code base on Nodes.js' `process.env`.


Compatible with [ts-patch](https://github.com/nonara/ts-patch)(recommended) and [ttypescript](https://github.com/cevek/ttypescript/tree/master/packages/ttypescript)

---

## Installation

With NPM:
```
npm i @adopisoft/remove-if-env --save-dev
```

OR with YARN:
```
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
      when compiling with PROD=true tsc'
  )
}
```


## Creating the `remove-if-env.ts` file

The `remove-if-env.ts` file is used for your local typescript completion only and to make sure the codes inside the if statement can execute locally. To do this, we have to create this file which contains placeholder values for the `process.env.*` properties:

`./remove-if-env.ts`

```js

export default {
  PROD: true,
  SOME_OTHER_ENV: true
}
```



## Plugin Options

**envVar** - Set the variable name of `removeIfEnv` object to be used in your codes. If not set, default is `removeIfEnv`.



## Compiling Your Code
To strip off the if statement blocks during compilation, we must set the environment variables to one of the following values - `1`, `yes`, or `true`.
```
$ export PROD=1
$ npx tsc
```

## Caveats

For now, the `import removeIfEnv from ./remove-if-env` import statement will not be stripped off in production
and will remain as an unused variable in the file output.

This can be fixed by using additional javascript preprocessors like babel, terser or gulp. But the long term solution for this would be to
remove the import statement in the AST within the transform plugin itself.

## Project Status

This project is very much still a WIP altough this is enough for our internal tooling requirements.
We will follow proper semantic versioning to avoid breaking changes for other consumers.
PRs are always welcome if you want to improve this tool.



## License

[MIT LICENSE](./LICENSE.txt)

