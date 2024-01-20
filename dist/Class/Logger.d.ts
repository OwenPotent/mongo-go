export declare const LoggerLevels: {
    error: string;
    warn: string;
    info: string;
    debug: string;
    verbose: string;
};
export declare type LoggerLevels = keyof typeof LoggerLevels;
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
    level: LoggerLevels;
    timestamp: boolean;
    colors: boolean;
    format: string;
    /**
     *
     * @param options Logger options
     * @param options.level Logger level
     * @param options.timestamp Whether to show timestamp
     * @param options.colors Whether to show colors
     * @param options.format Timestamp format
     *
     */
    constructor(options?: LoggerOptions);
    private _log;
    /**
     * Log an error message
     * @param message Message to log
     * @param args Arguments to log
     * @example
     * logger.error("Hello world!");
     */
    error(message: string, ...args: any[]): void;
    /**
     * Log a warning message
     * @param message Message to log
     * @param args Arguments to log
     * @example
     * logger.warn("Hello world!");
     */
    warn(message: string, ...args: any[]): void;
    /**
     * Log an info message
     * @param message Message to log
     * @param args Arguments to log
     * @example
     * logger.info("Hello world!");
     */
    info(message: string, ...args: any[]): void;
    /**
     * Log a debug message
     * @param message Message to log
     * @param args Arguments to log
     * @example
     * logger.debug("Hello world!");
     */
    debug(message: string, ...args: any[]): void;
    /**
     * Log a verbose message
     * @param message Message to log
     * @param args Arguments to log
     * @example
     * logger.verbose("Hello world!");
     */
    verbose(message: string, ...args: any[]): void;
    private get _timestamp();
}
