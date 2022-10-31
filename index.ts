import * as ts from 'typescript'

interface PluginOptions {
  envVar?: string
}

export default function (program: ts.Program, opts?: PluginOptions): any {
  const envVar = opts?.envVar ?? 'removeIfEnv'
  const signature = 'Removed by @adopisoft/ts-if-env'
  const stars = '************************'
  const eqlTokens = ['===', '==']

  return (ctx: ts.TransformationContext) => {
    return (sourceFile: ts.SourceFile) => {
      function visitor (node: ts.Node): ts.Node {
        if (ts.isIfStatement(node)
          && ts.isBinaryExpression(node.expression)
          && eqlTokens.includes(node.expression.operatorToken.getFullText().trim())
        ) {
            const expression = node.expression
            const leftExp = expression.left.getFullText().trim()
            const rightExp = expression.right.getFullText().replace(/"|'/g, '').trim()
            if (leftExp.indexOf(envVar) > -1) {
              const envField = leftExp.replace(`${envVar}.`, '')
              const optValue = process.env[envField]
              if (optValue === rightExp) {
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
