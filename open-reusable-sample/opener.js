const vscode = require('vscode');
const shared = require('./shared.js');

function openMain() {
	const editor = vscode.window.activeTextEditor;
	if (!shared.testNoTab(editor)) {
		return;
	}

	const currentFilePath = editor.document.uri.fsPath;
	if (editor.document.isUntitled) {
		vscode.window.showInformationMessage(
			'This doesn\'t work on files that aren\'t saved in the'
			+ ' GitHub docs repository.'
		);
		return;
	}

	const selection = editor.selection;
	let reusableString;
	if (selection.isEmpty) {
		reusableString = shared.getReusableString(editor);
	} else {
		reusableString = editor.document.getText(selection);
	}

	const regex = /{% *data ([^ %]*) *%}/;
	const regexMatchArray = reusableString.match(regex);
	if (regexMatchArray === null) {
		vscode.window.showInformationMessage(
			'You didn\'t select a valid reusable or a variable.'
		);
		return;
	}

	const directorySeparator = process.platform === 'win32' ? '\\' : '/';

	let filepath = regexMatchArray[1];
	filepath = filepath.replace(/\./g, directorySeparator);

	const baseRegex = new RegExp(
		'.*\\' + directorySeparator
		+ '(help-docs|docs-internal)\\'
		+ directorySeparator,
		'g'
	);
	const baseMatchArray = currentFilePath.match(baseRegex);
	if (!baseMatchArray) {
		vscode.window.showErrorMessage(
			'Could not determine the base path of the docs repository.'
		);
		return;
	}
	const basepath = baseMatchArray[0] + 'data' + directorySeparator;

	let isVariable = false;
	let variableName = '';

	if (filepath.indexOf('variables') === 0) {
		isVariable = true;

		// Get the variable name at the end of the filepath
		const varRegex = new RegExp(
			'\\' + directorySeparator
			+ '([^\\' + directorySeparator + ']*$)'
		);
		const varMatchArray = filepath.match(varRegex);
		variableName = varMatchArray[1];

		// Remove directorySeparator + variableName from the end
		filepath = filepath.replace(
			new RegExp('\\' + directorySeparator + variableName + '$'),
			''
		);

		filepath = basepath + filepath + '.yml';
	} else {
		filepath = basepath + filepath + '.md';
	}

	filepath = decodeURIComponent(filepath);

	vscode.workspace.openTextDocument(filepath).then(
		doc => {
			return vscode.window.showTextDocument(doc).then(e => {
				e.edit(_editObject => {
					if (isVariable) {
						findLineNumberOfVariable(variableName);
					}
				});
			});
		},
		_err => {
			vscode.window.showErrorMessage('File not found: ' + filepath);
		}
	);
}

function findLineNumberOfVariable(variableName) {
	const newEditor = vscode.window.activeTextEditor;
	let lineNumberOfVariable = 0;
	const currentCursorLineNumber = newEditor.selection.active.line + 1;
	let matchResultArray;

	const lineCount = newEditor.document.lineCount;
	for (let parseLine = 0; parseLine < lineCount; parseLine++) {
		const lineText = newEditor.document.lineAt(parseLine);
		const regex = new RegExp(variableName + ':');
		matchResultArray = lineText.text.match(regex);
		if (matchResultArray) {
			lineNumberOfVariable = parseLine + 1;
			moveCursor(currentCursorLineNumber, lineNumberOfVariable);
			centralizar(lineNumberOfVariable);
			return;
		}
	}
	if (!matchResultArray) {
		// Move the cursor to line 1 of the variables file
		vscode.commands.executeCommand('cursorMove', {
			to: 'up',
			by: 'line',
			value: currentCursorLineNumber
		});
		vscode.window.showInformationMessage(
			'\'' + variableName + '\' isn\'t defined in this file.'
		);
	}
}

function centralizar(lineToCenter) {
	// Put the current line near the centre of the visible area
	vscode.commands.executeCommand('revealLine', {
		lineNumber: lineToCenter,
		at: 'center'
	});
}

function moveCursor(currentCursorLineNumber, targetLineNumber) {
	const errorPreamble = 'Something is wrong with the cursorMove: ';

	// Move cursor to line 1 then down to the target line
	vscode.commands
		.executeCommand('cursorMove', {
			to: 'up',
			by: 'line',
			value: currentCursorLineNumber
		})
		.then(undefined, err => {
			console.error(errorPreamble + 'up. ' + err);
		});

	vscode.commands
		.executeCommand('cursorMove', {
			to: 'down',
			by: 'line',
			value: targetLineNumber - 1
		})
		.then(undefined, err => {
			console.error(errorPreamble + 'down. ' + err);
		});

	vscode.commands
		.executeCommand('cursorMove', {
			to: 'wrappedLineStart'
		})
		.then(undefined, err => {
			console.error(errorPreamble + 'wrappedLineStart. ' + err);
		});

	vscode.commands
		.executeCommand('cursorMove', {
			to: 'wrappedLineEnd',
			select: true
		})
		.then(undefined, err => {
			console.error(errorPreamble + 'wrappedLineEnd. ' + err);
		});
}

// eslint-disable-next-line no-undef
module.exports = {
	openMain
};
