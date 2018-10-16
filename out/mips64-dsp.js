"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function getSymbols(document) {
    let lineNumber = document.lineCount;
    let checkVariables = false;
    let retArray = [];
    // search inside the data section
    for (let i = 0; i < lineNumber; i++) {
        let line = document.lineAt(i).text;
        // search variables in the data section, or labels in the text section
        if (line.includes(":") && !line.startsWith(";")) {
            let variableName = line.split(":")[0].trim();
            let variableType = line.split(":")[1].trim().split(" ")[0].trim();
            let item = new vscode.DocumentSymbol(variableName, checkVariables ? variableType : "", checkVariables ? vscode.SymbolKind.Variable : vscode.SymbolKind.Function, new vscode.Range(new vscode.Position(i, line.indexOf(variableName)), new vscode.Position(i, line.indexOf(variableName) + variableName.length)), new vscode.Range(new vscode.Position(i, line.indexOf(variableName)), new vscode.Position(i, line.indexOf(variableName) + variableName.length)));
            retArray.push(item);
        }
        if (line.trim() === ".data") {
            checkVariables = true;
        }
        else if (line.trim() === ".text") {
            checkVariables = false;
        }
    }
    return retArray;
}
exports.getSymbols = getSymbols;
class MIPS64DocumentSymbolProvider {
    provideDocumentSymbols(document, token) {
        return getSymbols(document);
    }
}
exports.MIPS64DocumentSymbolProvider = MIPS64DocumentSymbolProvider;
//# sourceMappingURL=mips64-dsp.js.map