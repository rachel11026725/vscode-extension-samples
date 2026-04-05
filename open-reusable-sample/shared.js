const vscode = require('vscode');

function testNoTab(editor) {
	if (!editor) {
		vscode.window.showInformationMessage('No editor tab currently open');
		return false;
	}
	return true;
}

function getReusableString(editor) {
	let reusableString = '';
	const objSelectTextAroundCursor =
		editor.document.getWordRangeAtPosition(
			editor.selection.active,
			/{%[^%]*%}/
		);
	if (objSelectTextAroundCursor) {
		reusableString = editor.document.getText(objSelectTextAroundCursor);
	}
	return reusableString;
}

// eslint-disable-next-line no-undef
module.exports = {
	testNoTab,
	getReusableString
};
