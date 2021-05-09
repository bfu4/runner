import {Uri, window, workspace, WorkspaceFolder} from "vscode";

/**
 * Get the workspace of a given uri
 * @param uri uri
 */
export function getWorkspace(uri: Uri): WorkspaceFolder | null {
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

export namespace validate {

    export function workspaces(): boolean {
        // Dear JS, what the fuck?
        const folders = workspace.workspaceFolders;
        const existing = !!folders;
        if (!existing || folders!.length < 1) {
            window.showErrorMessage("Could not find a workspace!");
        }
        return existing;
    }

    export function existing(val: any): boolean {
        const existing = !!val;
        if (!existing || val === null) {
            window.showErrorMessage(`Value \"${val}\" does not exist!`);
        }
        return existing && val !== null;
    }

}