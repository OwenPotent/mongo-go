import chalk from "chalk";

export const LoggerLevels = {
    error: chalk.redBright("ERROR"),
    warn: chalk.yellowBright("WARN"),
    info: chalk.blueBright("INFO"),
    debug: chalk.magentaBright("DEBUG"),
    verbose: chalk.cyanBright("VERBOSE"),
};

export type LoggerLevels = keyof typeof LoggerLevels;

export interface LoggerOptions {
    level?: LoggerLevels;
    timestamp?: boolean;
    colors?: boolean;
    format?: string;
}

/**
 * Logger class to log messages to the console
 */
export default class Logger {
    // Logger Levels
    public level: LoggerLevels;

    // Logger Options
    public timestamp: boolean;
    public colors: boolean;
    public format: string;

    /**
     * 
     * @param options Logger options
     * @param options.level Logger level
     * @param options.timestamp Whether to show timestamp
     * @param options.colors Whether to show colors
     * @param options.format Timestamp format
     * 
     */
    constructor(options: LoggerOptions = {}) {
        this.level = options.level || "info";
        this.timestamp = options.timestamp || false;
        this.colors = options.colors || false;
        this.format = options.format || "YYYY-MM-DD HH:mm:ss";
    }

    private _log(level: LoggerLevels, message: string, ...args: any[]): void {
        if (LoggerLevels[level] === undefined) {
            throw new TypeError(
                `Logger level must be one of: ${Object.keys(LoggerLevels).join(", ")}`
            );
        }
        if (LoggerLevels[level] === "DEBUG" && this.level !== "debug") {
            return;
        }
        if (LoggerLevels[level] === "VERBOSE" && this.level !== "verbose") {
            return;
        }

        const timestamp = this.timestamp ? `[${this._timestamp}] ` : "";
        const color = this.colors ? LoggerLevels[level] : level;
        const msg = `${timestamp}${color} ${message}`;

        if (args.length) {
            console.log(msg, ...args);
            return;
        }

        console.log(msg);
    }

    /**
     * Log an error message
     * @param message Message to log
     * @param args Arguments to log
     * @example
     * logger.error("Hello world!");
     */
    public error(message: string, ...args: any[]): void {
        this._log("error", message, ...args);
    }

    /**
     * Log a warning message
     * @param message Message to log
     * @param args Arguments to log
     * @example
     * logger.warn("Hello world!");
     */
    public warn(message: string, ...args: any[]): void {
        this._log("warn", message, ...args);
    }

    /**
     * Log an info message
     * @param message Message to log
     * @param args Arguments to log
     * @example
     * logger.info("Hello world!");
     */
    public info(message: string, ...args: any[]): void {
        this._log("info", message, ...args);
    }

    /**
     * Log a debug message
     * @param message Message to log
     * @param args Arguments to log
     * @example
     * logger.debug("Hello world!");
     */
    public debug(message: string, ...args: any[]): void {
        this._log("debug", message, ...args);
    }

    /**
     * Log a verbose message
     * @param message Message to log
     * @param args Arguments to log
     * @example
     * logger.verbose("Hello world!");
     */
    public verbose(message: string, ...args: any[]): void {
        this._log("verbose", message, ...args);
    }

    private get _timestamp(): string {
        return new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
    }
}