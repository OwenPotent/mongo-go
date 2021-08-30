import { Collection } from "../Utility/Collection";
declare class MongoGo {
    private schema;
    private MongoGoCollection;
    constructor(MongoURI: string);
    private ready;
    /**
     * Saves data to the database in an easy format with 2 needed providers, "key" and "value".
     * @param key The key, so you can get it with <MongoGoClient>.get("key")
     * @param value value The value which will be saved to the key
     * @example <MongoGo>.set("Hello", "World")
     *
     * // This makes the key as "Hello", value as "World" and stores it in the database.
     */
    set(key: string, value: any): Promise<void>;
    /**
     * Removes data from the database using the "key" as the id of the object in the container.
     * @param key The key you wish to delete
     * @example <MongoGo>.delete("Hello")
     *
     * // The client gets container/object literal with the key "Hello", and deletes the data and
     * // the object itself
     */
    delete(key: string): Promise<void>;
    /**
     * Gets data from the database using a "key" given and returns an Object literal.
     * @param key The key you wish to get data
     * @example <MongoGo>.get('Hello')
     *
     * // The client uses the key provided as an id to search for the data in the database and returns nothing if no data is found.
     */
    get(key: string): Promise<any>;
    /**
     * Pushes data to an array using a "key" given,
     * can be used when handling multiple values in a key. However, only Object
     * or Array-like formats are available for the value to be push, otherwise an error is called.
     * @param key The key you wish to push data to
     * @example <MongoGo>.push("Hello", ["World", "Earth", "Moon"])
     *
     * // The client first checks if the value is an array, if not an error is throwed
     * // Otherwise, the value is then pushed into the data
     */
    push(key: string, ...pushValue: string[]): Promise<void>;
    /**
     * @returns Cached data with self-made Collection class
     */
    collection(): Promise<Collection<string, any>>;
}
export { MongoGo };
export default MongoGo;
