import {
    spawnSync,
    SpawnSyncOptions,
    SpawnSyncReturns
} from "child_process";

export class Process {

    readonly command: string;
    readonly opts?: SpawnSyncOptions;

    constructor(command: string, options?: SpawnSyncOptions | undefined) {
        this.command = command;
        this.opts = options;
    }

    spawn(args?: string) : SpawnSyncReturns<any> {
        if (args) {
            return this.spawnWithArgs(args);
        }
        return spawnSync(this.command, this.opts);
    }

    private spawnWithArgs(args: string) : SpawnSyncReturns<any> {
        return spawnSync(this.command, {
            input: args
        });
    }

}