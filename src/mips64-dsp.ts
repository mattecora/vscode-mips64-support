import * as vscode from 'vscode';

export function getSymbols(document: vscode.TextDocument): vscode.SymbolInformation[] {
    let lineNumber: number = document.lineCount;
    let checkVariables: boolean = false;
    let retArray: vscode.SymbolInformation[] = [];

    // search inside the data section
    for (let i = 0; i < lineNumber; i++) {
        let line = document.lineAt(i).text;

        // search variables in the data section, or labels in the text section
        if (line.includes(":") && !line.split(":")[0].includes(";") && !line.split(":")[0].includes(";")) {
            let variableName = line.split(":")[0].trim();

            let item = new vscode.SymbolInformation(variableName,
                checkVariables ? vscode.SymbolKind.Variable : vscode.SymbolKind.Function, 
                new vscode.Range(new vscode.Position(i, line.indexOf(variableName)), new vscode.Position(i, line.indexOf(variableName) + variableName.length)),
            );
            
            retArray.push(item);
        }

        if (line.trim() === ".data") {
            checkVariables = true;
        } else if (line.trim() === ".text") {
            break;
        }
    }

    return retArray;
}

export class MIPS64DocumentSymbolProvider implements vscode.DocumentSymbolProvider {
    
    public provideDocumentSymbols(
        document: vscode.TextDocument, token: vscode.CancellationToken): 
        vscode.SymbolInformation[] {
            return getSymbols(document);
    }

}