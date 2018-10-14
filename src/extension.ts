'use strict';

import * as vscode from 'vscode';
import { asmRunner, winmips64Runner } from './runners';

let asmCommand: vscode.Disposable | undefined = undefined;
let winmips64Command: vscode.Disposable | undefined = undefined;

let outputChannel: vscode.OutputChannel | undefined = undefined;

export function activate(context: vscode.ExtensionContext) {
    // open an output channel
    outputChannel = vscode.window.createOutputChannel("MIPS64");

    // define the asm command
    asmCommand = vscode.commands.registerTextEditorCommand(
        "mips64.asmBuild",
        (textEditor, edit) => {
            // check the language ID
            if (textEditor.document.languageId !== "mips64") {
                vscode.window.showInformationMessage("Please select a WinMIPS64 assembly file");
                return;
            }

            // check the value of winmips64.path
            let winmips64Path = vscode.workspace.getConfiguration().get<string>("winmips64.path");

            // if everything is ok, run
            if (winmips64Path && outputChannel) {
                asmRunner(winmips64Path, textEditor.document.fileName, outputChannel);
            } else {
                vscode.window.showErrorMessage("Cannot run command: winmips64.path is not specified in settings");
            }
        }
    );

    // define the winmips64 command
    winmips64Command = vscode.commands.registerTextEditorCommand(
        "mips64.winmips64Run",
        (textEditor, edit) => {
            // check the language ID
            if (textEditor.document.languageId !== "mips64") {
                vscode.window.showInformationMessage("Please select a WinMIPS64 assembly file");
                return;
            }

            // check the value of winmips64.path
            let winmips64Path = vscode.workspace.getConfiguration().get<string>("winmips64.path");

            // if everything is ok, run
            if (winmips64Path && outputChannel) {
                winmips64Runner(winmips64Path, textEditor.document.fileName, outputChannel);
            } else {
                vscode.window.showErrorMessage("Cannot run command: winmips64.path is not specified in settings");
            }
        }
    );
}

export function deactivate() {
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