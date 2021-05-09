import { EXTENSION_NAME } from "../extension";
import { commands, Disposable } from "vscode";

type Callback = (...args: any[]) => any;

interface Command {

    name: string;
    callback: Callback;
    thisArg?: any;

}

export function create(_name: string, callback: Callback, thisArg?: any) : Command {
    return { name: `${EXTENSION_NAME}.${_name}`, callback, thisArg };
}

export function register(command: Command): Disposable {
    return commands.registerCommand(command.name, command.callback, command.thisArg);
}