import * as vscode from 'vscode';
import * as fs from 'fs';
import { getSymbols } from './mips64-dsp';

interface MIPS64Instruction {
    body: string;
    description: string;
}

export class MIPS64CompletionItemProvider implements vscode.CompletionItemProvider {
    
    private instructions: { [key: string]: MIPS64Instruction; } = {};
    private data: { [key: string]: MIPS64Instruction; } = {};
    private reserved: { [key: string]: MIPS64Instruction; } = {};

    constructor(basePath: string) {
        this.instructions = JSON.parse(fs.readFileSync(basePath + "\\data\\mips64-instructions.json").toString());
        this.data = JSON.parse(fs.readFileSync(basePath + "\\data\\mips64-data.json").toString());
        this.reserved = JSON.parse(fs.readFileSync(basePath + "\\data\\mips64-reserved.json").toString());
    }

    public provideCompletionItems(
        document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): 
        vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
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
            getSymbols(document).forEach(element => {
                let item = new vscode.CompletionItem(element.name);
                item.kind = vscode.CompletionItemKind.Variable;
                item.detail = element.detail;
                possibleHelp.items.push(item);
            });

            return possibleHelp;
    }

}