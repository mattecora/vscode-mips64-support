import * as vscode from 'vscode';
import * as fs from 'fs';
import { getSymbols } from './mips64-dsp';

export class MIPS64CompletionItemProvider implements vscode.CompletionItemProvider {

    private MIPS64CompletionList: vscode.CompletionList;

    constructor(basePath: string) {
        this.MIPS64CompletionList = new vscode.CompletionList;

        // read symbols for instructions from the data folder
        let parsedInstructions = {
            ...JSON.parse(fs.readFileSync(basePath + "\\data\\mips64-instructions.json").toString()),
            ...JSON.parse(fs.readFileSync(basePath + "\\data\\mips64-data.json").toString()),
            ...JSON.parse(fs.readFileSync(basePath + "\\data\\mips64-reserved.json").toString())
        };
        
        vscode.window.showInformationMessage(parsedInstructions);
        
        // add instructions to symbols
        for (let key in parsedInstructions) {
            let item = new vscode.CompletionItem(key);

            item.kind = vscode.CompletionItemKind.Function;
            item.detail = parsedInstructions[key]["description"];

            this.MIPS64CompletionList.items.push(item);
        }

        // generate symbols for registers
        for (let i = 0; i < 32; i++) {
            let itemr = new vscode.CompletionItem("r" + i);
            let itemf = new vscode.CompletionItem("f" + i);

            itemr.kind = vscode.CompletionItemKind.Reference;
            itemr.detail = "Integer register r" + i;

            itemf.kind = vscode.CompletionItemKind.Reference;
            itemf.detail = "Floating-point register r" + i;

            this.MIPS64CompletionList.items.push(itemr, itemf);
        }
    }

    public provideCompletionItems(
        document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): 
        vscode.CompletionItem[] | vscode.CompletionList | Thenable<vscode.CompletionItem[]> | Thenable<vscode.CompletionList> {
            // get the word
            let possibleHelp = new vscode.CompletionList();

            // list symbols
            this.MIPS64CompletionList.items.forEach(element => {
                possibleHelp.items.push(element);
            });

            // list variables
            getSymbols(document).forEach(element => {
                let item = new vscode.CompletionItem(element.name);
                item.kind = vscode.CompletionItemKind.Variable;
                possibleHelp.items.push(item);
            });

            return possibleHelp;
    }

}