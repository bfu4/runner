import {ShellExecution, Task, tasks} from "vscode";

export type ExecutableCommand = {command: string, args?: string[]};

/**
 * Base class describing a task executor
 */
export class Executor {

    readonly command?: string;
    readonly workingDirectory: string;

    constructor(workingDirectory: string, command?: string) {
        this.workingDirectory = workingDirectory;
        this.command = command;
    }

    /**
     * Spawn multiple commands
     * @param commands
     */
    async spawnChained(...commands: ExecutableCommand[]) {
        return commands.map(async (cmd) => {
            // Originally these lines of code were `return await this.spawnSingular(cmd.command, ...cmd.args);`
            // My lack of knowledge has informed me that if it's undefined, it's not iterable, and will throw.
            if (cmd.args) {
                return await this.spawnSingular(cmd.command, ...cmd.args);
            } else {
                return await this.spawnSingular(cmd.command);
            }
        });
    }

    /**
     * Spawn command (instance)
     * @param args
     */
    async spawn(...args: string[] | undefined[]) {
        if (!this.command) {
            throw ReferenceError("Attempted to call instance method on improperly configured process.");
        }
        if (args) {
            const typedArgs = args as string[];
            return await this.spawnWithArgs(...typedArgs);
        }
        return await this.spawnSingular(this.command, ...args);
    }

    /**
     * Spawn command with given arguments
     * @param args
     * @private
     */
    private async spawnWithArgs(...args: string[]) {
        if (!this.command) {
            throw ReferenceError("Attempted to call instance method on improperly configured process.");
        }
        return await this.spawnSingular(this.command, ...args);
    }

    /**
     * Spawn a singular command
     * @param command
     * @param args
     * @private
     */
    private async spawnSingular(command: string, ...args: string[] | undefined[]) {
        const definition = {type: "build"};
        const argsAsString: string = args ? args.join("\u0020") : " ";
        const execution: ShellExecution = new ShellExecution(`${command} ${argsAsString}`);
        return await tasks.executeTask(new Task(definition, command, this.workingDirectory, execution));
    }

}