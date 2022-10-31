import * as ts from 'typescript'

interface PluginOptions {
  env?: []
}

export default function (program: ts.Program, pluginOptions: PluginOptions = {}): any {
  const signature = 'Removed by @adopisoft/ts-if-env'
  const stars = '************************'
  const optFields = pluginOptions.env ?? []
  const envFields = optFields.map(k => `process.env.${k}`)
  const eqlTokens = ['===', '==']

  return (ctx: ts.TransformationContext) => {
    return (sourceFile: ts.SourceFile) => {
      function visitor (node: ts.Node): ts.Node {
        if (ts.isIfStatement(node)
            && ts.isBinaryExpression(node.expression)
            && eqlTokens.includes(node.expression.operatorToken.getFullText())
           ) {
          const expression = node.expression
          const leftExp = expression.left.getFullText()
          const rightExp = expression.right.getFullText().replace(/"|'/g, '').trim()
          const envIndex = envFields.indexOf(leftExp)
          if (envIndex > -1) {
            const envField = optFields[envIndex]
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
