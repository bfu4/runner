// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {ExtensionContext} from 'vscode';
import {log} from './util';
import {makeCommand} from "./commands";

export const EXTENSION_NAME = "runner";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
    log("activating {} in context of {}", EXTENSION_NAME, context.extension.id);
    const {subscriptions} = context;

    subscriptions.push(makeCommand);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
