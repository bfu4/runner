import {Process} from "./process";
import {Uri, window, workspace, WorkspaceFolder} from "vscode";

const changeDir = new Process("cd");
const makeProc = new Process("make");

/**
 * Change to the workspace root directory and spawn make
 * @param args
 */
export const runMake = (args?: any) => {
    const doc = window.activeTextEditor?.document;
    if (doc) {
        const path = doc.uri;
        const ws = getWorkspace(path);
        if (ws !== null) {
            changeDir.spawn(ws.uri.fsPath);
            makeProc.spawn(args);
        }
    } else {
        window.showErrorMessage(`Could not find a document at ${doc}`);
    }
};

/**
 * Get the workspace of a given uri
 * @param uri uri
 */
function getWorkspace(uri: Uri): WorkspaceFolder | null {
    const {workspaceFolders} = workspace;
    if (workspaceFolders) {
        const found = workspaceFolders.filter((folder) => {
            return uri.fsPath.indexOf(folder.uri.fsPath) !== -1;
        });

        if (found) {
            return found[0];
        }
    }
    return null;
}