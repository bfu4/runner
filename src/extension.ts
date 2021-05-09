// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {Disposable, ExtensionContext} from 'vscode';
import {log} from './util';
import {create, runMake, register, Command, runExecute} from "./commands";

export const EXTENSION_NAME = "runner";

function setupCommand(command: Command): Disposable {
    return register(create(command.name, command.callback, command.thisArg));
}

function setupCommands(...commands: Command[]): Disposable[] {
    return commands.map((command) => {
        return setupCommand(command);
    });
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
    log("activating {} in context of {}", EXTENSION_NAME, context.extension.id);
    const {subscriptions} = context;

    // Commands
    const disposables: Disposable[] = setupCommands(
        {name: "make", callback: runMake },
        {name: "exec", callback: runExecute }
    );

    // Push to subscriptions
    disposables.forEach((dispo) => {
        subscriptions.push(dispo);
    });
}

// this method is called when your extension is deactivated
export function deactivate() {}
