const vscode = require('vscode');
const shared = require('./shared.js');

function copyMain() {
	const editor = vscode.window.activeTextEditor;
	if (!shared.testNoTab(editor)) {
		return;
	}

	const reusableString = shared.getReusableString(editor);

	if (reusableString !== '') {
		// Write to clipboard
		vscode.env.clipboard.writeText(reusableString);

		let startSelection, endSelection, moveLeftBy, moveRightBy;
		startSelection = endSelection =
			editor.document.offsetAt(editor.selection.anchor);

		// Get the position of the start of the reusable
		// by parsing each character from the cursor leftwards until "{"
		for (
			let parseCharacter = '';
			parseCharacter !== '{';
			startSelection--
		) {
			const startPosition =
				editor.document.positionAt(startSelection);
			const stopPosition =
				editor.document.positionAt(startSelection + 1);
			const textRange = new vscode.Range(
				startPosition,
				stopPosition
			);
			parseCharacter = editor.document.getText(textRange);
			moveLeftBy = endSelection - startSelection;
		}

		// Get the position of the end of the reusable by parsing forwards
		for (
			let parseCharacter = '';
			parseCharacter !== '}';
			endSelection++
		) {
			const startPosition =
				editor.document.positionAt(endSelection);
			const stopPosition =
				editor.document.positionAt(endSelection + 1);
			const textRange = new vscode.Range(
				startPosition,
				stopPosition
			);
			parseCharacter = editor.document.getText(textRange);
			moveRightBy = endSelection - startSelection;
		}

		// Move the cursor to the start of the reusable
		vscode.commands.executeCommand('cursorMove', {
			to: 'left',
			by: 'character',
			value: moveLeftBy
		});
		// Move the cursor to the end, selecting the text
		vscode.commands.executeCommand('cursorMove', {
			to: 'right',
			by: 'character',
			value: moveRightBy,
			select: true
		});
	} else {
		vscode.window.showInformationMessage(
			'Open reusables extension: cursor is not within a'
			+ ' reusable or variable'
		);
	}
}

// eslint-disable-next-line no-undef
module.exports = {
	copyMain
};
