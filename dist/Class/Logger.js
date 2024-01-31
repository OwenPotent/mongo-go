"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerLevels = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.LoggerLevels = {
    error: chalk_1.default.redBright("ERROR"),
    warn: chalk_1.default.yellowBright("WARN"),
    info: chalk_1.default.blueBright("INFO"),
    debug: chalk_1.default.magentaBright("DEBUG"),
    verbose: chalk_1.default.cyanBright("VERBOSE"),
};
/**
 * Logger class to log messages to the console
 */
class Logger {
    // Logger Levels
    level;
    // Logger Options
    timestamp;
    colors;
    format;
    /**
     *
     * @param options Logger options
     * @param options.level Logger level
     * @param options.timestamp Whether to show timestamp
     * @param options.colors Whether to show colors
     * @param options.format Timestamp format
     *
     */
    constructor(options = {}) {
        this.level = options.level || "info";
        this.timestamp = options.timestamp || false;
        this.colors = options.colors || false;
        this.format = options.format || "YYYY-MM-DD HH:mm:ss";
    }
    _log(level, message, ...args) {
        if (exports.LoggerLevels[level] === undefined) {
            throw new TypeError(`Logger level must be one of: ${Object.keys(exports.LoggerLevels).join(", ")}`);
        }
        if (exports.LoggerLevels[level] === "DEBUG" && this.level !== "debug") {
            return;
        }
        if (exports.LoggerLevels[level] === "VERBOSE" && this.level !== "verbose") {
            return;
        }
        const timestamp = this.timestamp ? `[${this._timestamp}] ` : "";
        const color = this.colors ? exports.LoggerLevels[level] : level;
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
    error(message, ...args) {
        this._log("error", message, ...args);
    }
    /**
     * Log a warning message
     * @param message Message to log
     * @param args Arguments to log
     * @example
     * logger.warn("Hello world!");
     */
    warn(message, ...args) {
        this._log("warn", message, ...args);
    }
    /**
     * Log an info message
     * @param message Message to log
     * @param args Arguments to log
     * @example
     * logger.info("Hello world!");
     */
    info(message, ...args) {
        this._log("info", message, ...args);
    }
    /**
     * Log a debug message
     * @param message Message to log
     * @param args Arguments to log
     * @example
     * logger.debug("Hello world!");
     */
    debug(message, ...args) {
        this._log("debug", message, ...args);
    }
    /**
     * Log a verbose message
     * @param message Message to log
     * @param args Arguments to log
     * @example
     * logger.verbose("Hello world!");
     */
    verbose(message, ...args) {
        this._log("verbose", message, ...args);
    }
    get _timestamp() {
        return new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
    }
}
exports.default = Logger;
