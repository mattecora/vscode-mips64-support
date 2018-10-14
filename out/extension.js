'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const runners_1 = require("./runners");
let asmCommand = undefined;
let winmips64Command = undefined;
let outputChannel = undefined;
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