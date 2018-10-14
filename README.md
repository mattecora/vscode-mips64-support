# VS Code support for MIPS64 syntax

This extension adds syntax highlighting, snippets support and build and run commands for the MIPS64 assembly language via the WinMIPS64 simulator.

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

A snippet is provided for every single instruction of the ISA, to quickly insert:

* The mnemonic of the instruction (in lower case format)
* A tabulation character
* The list of the parameters required by the instruction, as reported on the MIPS64 language reference

## Commands
Starting from v0.1.0, it is possible to run directly `asm.exe` and `winmips64.exe` from the editor, via VS Code's commands palette.

The only thing you have to setup is the `winmips64.path` setting to match your folder structure. After that, you should be able to run the two commands via the usual interface (`Ctrl+Shift+P`); the commands' names are:

* MIPS64: Build with asm
* MIPS64: Run with winmips64