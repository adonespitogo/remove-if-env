import * as ts from 'typescript'

interface PluginOptions {
  envVar?: string
}

export default function (program: ts.Program, opts?: PluginOptions): any {
  const envVar = opts?.envVar ?? 'removeIfEnv'
  const signature = 'Removed by @adopisoft/remove-if-env'
  const stars = '************************'
  const trueValues = ['1', 'yes', 'true']

  return (ctx: ts.TransformationContext) => {
    return (sourceFile: ts.SourceFile) => {
      function visitor (node: ts.Node): ts.Node {
        if (ts.isIfStatement(node)) {
            const ifStatement = node.expression.getFullText().trim()
            if (ifStatement.indexOf(envVar) > -1) {
              const envField = ifStatement.replace(`${envVar}.`, '')
              const yes = trueValues.includes(process.env[envField] ?? '')
              if (yes) {
                return ts.factory.createIdentifier(`/*${stars}\n\t${signature}\n**${stars}\n\n${node.getFullText()}\n*/`)
              }
            }
        }
        return ts.visitEachChild(node, visitor, ctx)
      }
      return ts.visitEachChild(sourceFile, visitor, ctx)
    }
  }
}
