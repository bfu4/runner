import {Executor} from "./executor";
import {window, workspace} from "vscode";
import {getWorkspace, validate} from "../util";

/**
 * Change to the workspace root directory and spawn make
 * @param args
 */
export const runMake = (args?: any) => {
    if (validate.workspaces()) {
        const editor = window.activeTextEditor;
        let ws, doc, path;
        if (editor) {
            doc = editor.document;
            path = doc.uri;
            ws = getWorkspace(path);
        } else {
            // Will never be undefined after validation
            ws = workspace.workspaceFolders![0];
        }
        if (ws) {
            const exec = new Executor(ws.uri.fsPath);
            exec.spawnChained(
                {command: "cd", args: [ws.uri.fsPath]},
                {command: "/usr/bin/make", args}
            );
        }
    }
};
