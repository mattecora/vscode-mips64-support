'use strict';

import * as vscode from 'vscode';
import { asmRunner, winmips64Runner, winmips64Clean } from './runners';
import { MIPS64CompletionItemProvider } from './mips64-cip';
import { MIPS64DocumentSymbolProvider } from './mips64-dsp';

let asmCommand: vscode.Disposable | undefined = undefined;
let winmips64Command: vscode.Disposable | undefined = undefined;
let winmips64CleanCommand: vscode.Disposable | undefined = undefined;

let outputChannel: vscode.OutputChannel | undefined = undefined;

const MIPS64_FILE: vscode.DocumentFilter = { language: 'mips64', scheme: 'file' };

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

    winmips64CleanCommand = vscode.commands.registerCommand(
        "mips64.winmips64Clean",
        () => {
            // check the value of winmips64.path
            let winmips64Path = vscode.workspace.getConfiguration().get<string>("winmips64.path");

            if (winmips64Path) {
                winmips64Clean(winmips64Path);
            }
        }
    );

    let dsp = new MIPS64DocumentSymbolProvider();
    let cip = new MIPS64CompletionItemProvider(context.extensionPath);

    vscode.languages.registerDocumentSymbolProvider(MIPS64_FILE, dsp);
    vscode.languages.registerCompletionItemProvider(MIPS64_FILE, cip);
}

export function deactivate() {
    if (asmCommand) {
        asmCommand.dispose();
    }
    if (winmips64Command) {
        winmips64Command.dispose();
    }
    if (winmips64CleanCommand) {
        winmips64CleanCommand.dispose();
    }
    if (outputChannel) {
        outputChannel.dispose();
    }
}