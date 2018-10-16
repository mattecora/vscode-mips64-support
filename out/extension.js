'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const runners_1 = require("./runners");
const mips64_cip_1 = require("./mips64-cip");
const mips64_dsp_1 = require("./mips64-dsp");
let asmCommand = undefined;
let winmips64Command = undefined;
let outputChannel = undefined;
const MIPS64_FILE = { language: 'mips64', scheme: 'file' };
function activate(context) {
    // open an output channel
    outputChannel = vscode.window.createOutputChannel("MIPS64");
    // define the asm command
    asmCommand = vscode.commands.registerTextEditorCommand("mips64.asmBuild", (textEditor, edit) => {
        // check the language ID
        if (textEditor.document.languageId !== "mips64") {
            vscode.window.showInformationMessage("Please select a WinMIPS64 assembly file");
            return;
        }
        // check the value of winmips64.path
        let winmips64Path = vscode.workspace.getConfiguration().get("winmips64.path");
        // if everything is ok, run
        if (winmips64Path && outputChannel) {
            runners_1.asmRunner(winmips64Path, textEditor.document.fileName, outputChannel);
        }
        else {
            vscode.window.showErrorMessage("Cannot run command: winmips64.path is not specified in settings");
        }
    });
    // define the winmips64 command
    winmips64Command = vscode.commands.registerTextEditorCommand("mips64.winmips64Run", (textEditor, edit) => {
        // check the language ID
        if (textEditor.document.languageId !== "mips64") {
            vscode.window.showInformationMessage("Please select a WinMIPS64 assembly file");
            return;
        }
        // check the value of winmips64.path
        let winmips64Path = vscode.workspace.getConfiguration().get("winmips64.path");
        // if everything is ok, run
        if (winmips64Path && outputChannel) {
            runners_1.winmips64Runner(winmips64Path, textEditor.document.fileName, outputChannel);
        }
        else {
            vscode.window.showErrorMessage("Cannot run command: winmips64.path is not specified in settings");
        }
    });
    let dsp = new mips64_dsp_1.MIPS64DocumentSymbolProvider();
    let cip = new mips64_cip_1.MIPS64CompletionItemProvider(context.extensionPath);
    vscode.languages.registerDocumentSymbolProvider(MIPS64_FILE, dsp);
    vscode.languages.registerCompletionItemProvider(MIPS64_FILE, cip);
}
exports.activate = activate;
function deactivate() {
    if (asmCommand) {
        asmCommand.dispose();
    }
    if (winmips64Command) {
        winmips64Command.dispose();
    }
    if (outputChannel) {
        outputChannel.dispose();
    }
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map