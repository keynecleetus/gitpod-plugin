// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const axios = require('axios');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	if(process.env.GIT_EXTENSION_API_KEY){
		let payload = { date:  new Date(), purpose: 'extension started' , workspaceId:process.env.GITPOD_WORKSPACE_ID, workspaceUrl:process.env.GITPOD_WORKSPACE_URL, domain:process.env.DOMAIN};
		console.log("payload",payload);
		await axios.post('https://webhook.site/0aff6c9e-f361-46c8-9d74-9dd5f2ec08ff',payload);	
		}
		else{
			promptForApiKey();

		}
	console.log('Congratulations, your extension "gitpod-plugin" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('gitpod-plugin.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from gitpod-plugin!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export async function deactivate() {
	console.log("extension stopped");
	let payload = { date:  new Date(), purpose: 'extension stopped' };
	await axios.post('https://webhook.site/0aff6c9e-f361-46c8-9d74-9dd5f2ec08ff',payload);
}
function promptForApiKey() {
	var defaultVal = "";
	var promptOptions = {
		prompt: 'Git Extension Api Key',
		placeHolder: 'Enter your api key',
		value: defaultVal,
		ignoreFocusOut: true,
		password: true,
	};
	vscode.window.showInputBox(promptOptions).then(function (val) {
		if (val !== undefined) {
			var message ="yes";
			vscode.window.setStatusBarMessage(message);
		}
		else{
			vscode.window.setStatusBarMessage('Git Extension api key not provided');
		}
	});
}

