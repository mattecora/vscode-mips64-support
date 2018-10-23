'use strict';

import * as child_process from 'child_process';
import * as fs from 'fs';
import * as vscode from 'vscode';

export function asmRunner(winmips64Path: string, filePath: string, outputChannel: vscode.OutputChannel) {
    // show the output channel
    outputChannel.show();
    
    // check that asm exists
    if (!fs.existsSync(winmips64Path + "\\asm.exe")) {
        vscode.window.showErrorMessage("The value of winmips64.path is not valid. Please check your settings and try again.");
        return;
    }

    // change working directory
    process.chdir(winmips64Path);

    // run asm
    child_process.exec(
        "asm.exe \"" + filePath + "\"",
        (error, stdout, stderr) => {
            // write output to the output window
            outputChannel.appendLine(stdout);

            // remove temp files if everything was correct
            if (!error) {
                vscode.window.showInformationMessage("Correctly assembled " + filePath);
                fs.unlink(filePath.split(".")[0] + ".cod", (err) => {});
                fs.unlink(filePath.split(".")[0] + ".dat", (err) => {});
            } else {
                vscode.window.showErrorMessage("Cannot assemble " + filePath);
            }
        }
    );
}

export function winmips64Runner(winmips64Path: string, filePath: string, outputChannel: vscode.OutputChannel) {
    // check that winmips64 exists
    if (!fs.existsSync(winmips64Path + "\\winmips64.exe")) {
        vscode.window.showErrorMessage("The value of winmips64.path is not valid. Please check your settings and try again.");
        return;
    }

    // change working directory
    process.chdir(winmips64Path);

    // write las file
    fs.writeFile("winmips64.las", filePath, (err) => {
        // run winmips64
        vscode.window.showInformationMessage("Running " + filePath);
        child_process.exec("winmips64.exe");
    });
}

export function winmips64Clean(winmips64Path: string) {
    if (fs.existsSync(winmips64Path + "\\winmips64.las")) {
        fs.unlinkSync(winmips64Path + "\\winmips64.las");
    }
    if (fs.existsSync(winmips64Path + "\\winmips64.ini")) {
        fs.unlinkSync(winmips64Path + "\\winmips64.ini");
    }
    if (fs.existsSync(winmips64Path + "\\winmips64.pth")) {
        fs.unlinkSync(winmips64Path + "\\winmips64.pth");
    }

    vscode.window.showInformationMessage("Cleaning completed");
}