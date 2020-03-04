import * as ts from 'typescript';
import * as path from 'path';
import * as fs from 'fs';
import { readFileSync } from 'fs-extra';

const fileNames = process.argv.slice(2);


function getScssValues(fileSource: ts.SourceFile) {
  const scssValues: { left: string, right: string }[] = [];
  nodeJudge(fileSource);
  return scssValues.map(({ left, right }) => {
    return `${left}: ${right} !default;`;
  }).join('\n');
  function nodeJudge(node: ts.Node) {
    switch(node.kind) {
      case ts.SyntaxKind.VariableStatement:
        const varStat = node as ts.VariableStatement;
        varStat.declarationList.forEachChild((child) => {
          const firstToken = child.getFirstToken(fileSource) as ts.Identifier;
          const token = child.getChildren(fileSource).map((node) => {
            return node.getLastToken(fileSource);
          }).filter(node => !!node)[0];
          let rightText = '';
          if (!token) {
            const t = child.getChildren(fileSource).filter(node =>
              node.kind === (ts.SyntaxKind.StringLiteral)
              || node.kind === (ts.SyntaxKind.NumericLiteral))[0];
            if (t) rightText = t.getText(fileSource);
          } else {
            rightText = token.getText(fileSource);
          }
          rightText = rightText.replace(/^'([^']+)'$/g, (_, m1) => m1);
          scssValues.push({
            left: firstToken.escapedText.toString(),
            right: rightText,
          });
        })
    }
    ts.forEachChild(node, nodeJudge);
  }
}

fileNames.forEach((fileName) => {
  const sourceFile = ts.createSourceFile(
    fileName,
    readFileSync(fileName).toString(),
    ts.ScriptTarget.ES2015,
  );
  const content = getScssValues(sourceFile);
  fs.writeFileSync(path.resolve(__dirname, '../src/_styles/variables.scss'), content);
});
