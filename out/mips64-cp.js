"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("fs");
function getSymbols(document) {
    let lineNumber = document.lineCount;
    let checkVariables = false;
    let retArray = [];
    // search inside the data section
    for (let i = 0; i < lineNumber; i++) {
        let line = document.lineAt(i).text;
        if (checkVariables) {
            if (line.includes(":")) {
                let variableName = line.split(":")[0].trim();
                let variableType = line.split(":")[1].trim().split(" ")[0].trim();
                let item = new vscode.CompletionItem(variableName);
                item.kind = vscode.CompletionItemKind.Variable;
                item.detail = variableName + ": " + variableType;
                retArray.push(item);
            }
        }
        if (line.trim() === ".data") {
            checkVariables = true;
        }
        else if (line.trim() === ".text") {
            break;
        }
    }
    return retArray;
}
class MIPS64CompletionItemProvider {
    constructor(basePath) {
        this.instructions = {};
        this.instructions = JSON.parse(fs.readFileSync(basePath + "\\data\\mips64-instructions.json").toString());
    }
    provideCompletionItems(document, position, token, context) {
        // get the word
        let word = document.getText(document.getWordRangeAtPosition(position));
        let possibleHelp = new vscode.CompletionList;
        // list instructions
        for (let key in this.instructions) {
            if (key.includes(word)) {
                let item = new vscode.CompletionItem(key);
                item.kind = vscode.CompletionItemKind.Function;
                item.insertText = this.instructions[key].body;
                item.detail = this.instructions[key].description;
                possibleHelp.items.push(item);
            }
        }
        // list registers
        if (word.startsWith("r") || word.startsWith("f")) {
            for (let i = 0; i < 32; i++) {
                let item = new vscode.CompletionItem(word + i);
                item.kind = vscode.CompletionItemKind.Constant;
                item.detail = (word.startsWith("r") ? "Integer" : "Floating-point") + " register " + word + i;
                possibleHelp.items.push(item);
            }
        }
        // list variables
        getSymbols(document).forEach(element => {
            possibleHelp.items.push(element);
        });
        return possibleHelp;
    }
}
exports.MIPS64CompletionItemProvider = MIPS64CompletionItemProvider;
//# sourceMappingURL=mips64-cp.js.map