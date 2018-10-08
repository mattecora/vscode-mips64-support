# VS Code support for MIPS64 syntax

This extension adds syntax highlighting and snippets support for the MIPS64 assembly language. The considered ISA is version 1 of the MIPS64 standard, with the additions the pseudo-instructions provided by the WinMIPS64 environment.

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

A snippet is provided for every single instruction of the MIPS64 (version 1) standard ISA (no pseudo or vendor-specific instruction has been considered), to quickly insert:

* The mnemonic of the instruction (in lower case format)
* A tabulation character
* The list of the parameters required by the instruction, as reported on the MIPS64 language reference