"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("fs");
const mips64_dsp_1 = require("./mips64-dsp");
class MIPS64CompletionItemProvider {
    constructor(basePath) {
        this.instructions = {};
        this.data = {};
        this.reserved = {};
        this.instructions = JSON.parse(fs.readFileSync(basePath + "\\data\\mips64-instructions.json").toString());
        this.data = JSON.parse(fs.readFileSync(basePath + "\\data\\mips64-data.json").toString());
        this.reserved = JSON.parse(fs.readFileSync(basePath + "\\data\\mips64-reserved.json").toString());
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
        // list data
        for (let key in this.data) {
            if (key.includes(word)) {
                let item = new vscode.CompletionItem(key);
                item.kind = vscode.CompletionItemKind.Class;
                item.insertText = this.data[key].body;
                item.detail = this.data[key].description;
                possibleHelp.items.push(item);
            }
        }
        // list reserved
        for (let key in this.reserved) {
            if (key.includes(word)) {
                let item = new vscode.CompletionItem(key);
                item.kind = vscode.CompletionItemKind.Keyword;
                item.insertText = this.reserved[key].body;
                item.detail = this.reserved[key].description;
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
        mips64_dsp_1.getSymbols(document).forEach(element => {
            let item = new vscode.CompletionItem(element.name);
            item.kind = vscode.CompletionItemKind.Variable;
            item.detail = element.detail;
            possibleHelp.items.push(item);
        });
        return possibleHelp;
    }
}
exports.MIPS64CompletionItemProvider = MIPS64CompletionItemProvider;
//# sourceMappingURL=mips64-cip.js.map