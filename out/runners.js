'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = require("child_process");
const fs = require("fs");
const vscode = require("vscode");
function asmRunner(winmips64Path, filePath, outputChannel) {
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
    child_process.exec("asm.exe \"" + filePath + "\"", (error, stdout, stderr) => {
        // write output to the output window
        outputChannel.appendLine(stdout);
        // remove temp files if everything was correct
        if (!error) {
            vscode.window.showInformationMessage("Correctly assembled " + filePath);
            fs.unlink(filePath.split(".")[0] + ".cod", (err) => { });
            fs.unlink(filePath.split(".")[0] + ".dat", (err) => { });
        }
        else {
            vscode.window.showErrorMessage("Cannot assemble " + filePath);
        }
    });
}
exports.asmRunner = asmRunner;
function winmips64Runner(winmips64Path, filePath, outputChannel) {
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
exports.winmips64Runner = winmips64Runner;
//# sourceMappingURL=runners.js.map