import {Signale, SignaleConfig} from "signale";

// Signale configuration
const config: SignaleConfig = {
    underlineLabel: true,
    displayBadge: true,
    displayLabel: true
};

// Signale logging utilities
const {
    log: slog,
    info: sinfo,
    error: serr
} = new Signale({config});


/**
 * Compile string with `{}` and replace with provided arguments
 * @param message message to "compile"
 * @param args arguments to replace
 */
function compileArgs(message: string, ...args: string[]): string {
    let ret = message;
    for (let i = 0; i < args.length; i++) {
        if (ret.indexOf("{}") !== -1) {
            ret = ret.replace("{}", args[i]);
        } else {
            ret = ret.concat(`\u0020${args[i]}`);
        }
    }
    return ret;
}

/**
 * Compile message with given arguments, if any.
 * Use chalk module to color if necessary.
 * @param message message to compile
 * @param args arguments if any
 */
function compile(message: string, ...args: string[] | undefined[]): string {
    let messageToPrint = message;
    if (args !== undefined) {
        args = args as string[];
        messageToPrint = compileArgs(message, ...args);
    }
    return messageToPrint;
}

/**
 * Log a message
 * @param message
 * @param args
 */
export function log(message: string, ...args: string[] | undefined[]) {
    slog(compile(message, ...args));
}

/**
 * Log information
 * @param message
 * @param args
 */
export function info(message: string, ...args: string[] | undefined[]) {
    sinfo(compile(message, ...args));
}

/**
 * Log error
 * @param message
 * @param args
 */
export function error(message: string, ...args: string[] | undefined[]) {
    serr(compile(message, ...args));
}