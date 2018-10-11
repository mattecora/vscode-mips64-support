# VS Code support for MIPS64 syntax

This extension adds syntax highlighting, snippets support and tasks for the MIPS64 assembly language. It is possible to select among:

- The standard MIPS64 ISA (version 1)
- The WinMIPS64 version of the ISA

You can choose the preferred syntax via the Select Language window of VS Code.

## Syntax highlighting

Syntax highlighting is provided for:

* Comments, started via `#` or `;`
* Labels
* Mnemonics, in both upper and lower case formats
* Immediates, in decimal or hexadecimal format
* Registers, with the following supported syntaxes:
  * Numeric: `$[0-31]`, `r[0-31]`, `$r[0-31]`
  * Named: `$name` (see assembler reference)
  * Floating-point: `f[0-31]`, `$f[0-31]`

The styling file was adapted from [Textmate's](https://github.com/textmate/mips.tmbundle).

## Snippets

A snippet is provided for every single instruction of the chosen ISA, to quickly insert:

* The mnemonic of the instruction (in lower case format)
* A tabulation character
* The list of the parameters required by the instruction, as reported on the MIPS64 language reference

## Tasks running
Starting from v0.0.4, it is also possible to run directly `asm.exe` and `winmips64.exe` from the editor, via VS Code's task interface.

In order to have working tasks, you have to:

- Have a Python interpreter installed (since task runners are Python-based)
- Move the `.vscode` folder into your workspace directory
- Edit the `winmips64.path` in `settings.json` to match your folder structure

Then, you should be able to run the two tasks via the usual interface (`Ctrl+Shift+P`, Run Tasks).