import {window, workspace, WorkspaceFolder} from "vscode";
import {getWorkspace, validate} from "../util";
import {Executor} from "./executor";

export const runExecute = (args?: any) => {
    if (validate.workspaces()) {
        const editor = window.activeTextEditor;
        let ws: WorkspaceFolder, doc, path;
        if (editor) {
            doc = editor.document;
            path = doc.uri;
            ws = getWorkspace(path)!;
        } else {
            // Will never be undefined after validation
            ws = workspace.workspaceFolders![0];
        }
        if (ws) {
            const toExec = window.showInputBox({
                placeHolder: "execute file (relative to path): "
            });
            const exec = new Executor(ws.uri.fsPath);
            toExec.then((val) => {
                if (validate.existing(val)) {
                    exec.spawnChained({command: `${ws.uri.fsPath}/${val}`});
                }
            });
        }
    }
}