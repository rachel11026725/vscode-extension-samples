# Open Reusable Sample

This sample extension demonstrates how to open and copy reusable content references in GitHub docs markdown files. It works with the `docs-internal` repository to navigate between files that use `{% data %}` tags for reusable content and variables.

Based on the [open-reusable](https://github.com/hubwriter/open-reusables) extension by Alistair Christie (hubwriter).

## Features

- **Open reusable file**: Place your cursor in a `{% data reusables.xxx.yyy %}` or `{% data variables.xxx.yyy %}` tag and press <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>O</kbd> (or <kbd>Ctrl</kbd>+<kbd>Cmd</kbd>+<kbd>O</kbd> on Mac) to open the referenced file.
- **Copy reusable**: Place your cursor in a reusable tag and press <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>C</kbd> (or <kbd>Ctrl</kbd>+<kbd>Cmd</kbd>+<kbd>C</kbd> on Mac) to copy the tag to the clipboard and select it.

## VS Code API

### `vscode` module

- [`commands.registerCommand`](https://code.visualstudio.com/api/references/vscode-api#commands.registerCommand)
- [`window.showInformationMessage`](https://code.visualstudio.com/api/references/vscode-api#window.showInformationMessage)
- [`window.showErrorMessage`](https://code.visualstudio.com/api/references/vscode-api#window.showErrorMessage)
- [`workspace.openTextDocument`](https://code.visualstudio.com/api/references/vscode-api#workspace.openTextDocument)
- [`window.showTextDocument`](https://code.visualstudio.com/api/references/vscode-api#window.showTextDocument)
- [`env.clipboard.writeText`](https://code.visualstudio.com/api/references/vscode-api#env.clipboard)

### Contribution Points

- [`contributes.commands`](https://code.visualstudio.com/api/references/contribution-points#contributes.commands)
- [`contributes.keybindings`](https://code.visualstudio.com/api/references/contribution-points#contributes.keybindings)

## Running the Sample

- Run `npm install` in terminal to install dependencies
- Run the `Run Extension` target in the Debug View.
- Open a markdown file containing `{% data reusables.xxx.yyy %}` or `{% data variables.xxx.yyy %}` references within a `docs-internal` repository workspace.
- Place your cursor inside a reusable tag and use the keyboard shortcuts or command palette.
