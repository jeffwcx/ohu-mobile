import * as ts from 'typescript';
import * as fs from 'fs';

interface DocEntry {
  name?: string;
  fileName?: string;
  documentation?: string;
  type?: string;
  constructors?: DocEntry[];
  parameters?: DocEntry[];
  returnType?: string;
  props: DocEntry[];
}

/** Generate documentation for all classes in a set of .ts files */
function generateDocumentation(
  fileNames: string[],
  options: ts.CompilerOptions,
): void {
  // Build a program using the set of root file names in fileNames
  let program = ts.createProgram(fileNames, options);

  // Get the checker, we will use it to find more about classes
  let checker = program.getTypeChecker();
  let output: DocEntry[] = [];

  // Visit every sourceFile in the program
  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) {
      // Walk the tree to search for classes
      ts.forEachChild(sourceFile, visitInterface);
    }
  }

  // print out the doc
  // fs.writeFileSync('interfaces.json', JSON.stringify(output, undefined, 4));
  console.log(JSON.stringify(output, undefined, 4));
  return;

  function visitInterface(node: ts.Node) {
    if (!isNodeExported(node)) {
      return;
    }
    if (ts.isInterfaceDeclaration(node) && node.name) {
      let symbol = checker.getSymbolAtLocation(node.name);
      if (symbol) {
        output.push(serializeInterface(symbol));
      }
    }
  }

  function serializeInterface(symbol: ts.Symbol) {
    let details = serializeSymbol(symbol);
    return details;
  }

  /** Serialize a symbol into a json object */
  function serializeSymbol(symbol: ts.Symbol): DocEntry {
    const props: DocEntry[] = [];
    if (symbol.members) {
      symbol.members.forEach((s) => {
        props.push(serializeSymbol(s));
      });
    }

    return {
      name: symbol.getName(),
      documentation: ts.displayPartsToString(
        symbol.getDocumentationComment(checker),
      ),
      props,
      type: checker.typeToString(
        checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!),
      ),
    };
  }

  /** Serialize a signature (call or construct) */
  function serializeSignature(signature: ts.Signature) {
    return {
      parameters: signature.parameters.map(serializeSymbol),
      returnType: checker.typeToString(signature.getReturnType()),
      documentation: ts.displayPartsToString(
        signature.getDocumentationComment(checker),
      ),
    };
  }

  /** True if this is visible outside this file, false otherwise */
  function isNodeExported(node: ts.Node): boolean {
    return (
      (ts.getCombinedModifierFlags(node as ts.Declaration) &
        ts.ModifierFlags.Export) !==
        0 ||
      (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile)
    );
  }
}

generateDocumentation(process.argv.slice(2), {
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
});
