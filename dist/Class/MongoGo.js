"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoGo = void 0;
const mongoose_1 = require("mongoose");
const Collection_1 = require("../Utility/Collection");
const mix = mongoose_1.SchemaTypes.Mixed;
const { readyState } = mongoose_1.connection;
class MongoGo {
    schema = (0, mongoose_1.model)("MongoGo-Collection", new mongoose_1.Schema({
        key: String,
        value: mix
    }));
    MongoGoCollection = new Collection_1.Collection();
    constructor(MongoURI) {
        if (readyState !== 1) {
            if (!MongoURI) {
                throw new Error("A connection with MongoDB was not established, you did not provide a MongoURI!");
            }
        }
        (0, mongoose_1.connect)(MongoURI);
        this.ready();
    }
    async ready() {
        await this.schema.find({}).then((data) => {
            data.forEach(({ key, value }) => {
                this.MongoGoCollection.set(key, value);
            });
        });
    }
    /**
     * Saves data to the database in an easy format with 2 needed providers, "key" and "value".
     * @param key The key, so you can get it with <MongoGoClient>.get("key")
     * @param value value The value which will be saved to the key
     * @example <MongoGo>.set("Hello", "World")
     *
     * // This makes the key as "Hello", value as "World" and stores it in the database.
     */
    async set(key, value) {
        if (!key || !value)
            return;
        this.schema.findOne({ key }, async (err, data) => {
            if (err)
                throw err;
            if (data)
                data.value = value;
            else
                data = new this.schema({ key, value });
            data.save();
            this.MongoGoCollection.set(key, value);
        });
    }
    /**
     * Removes data from the database using the "key" as the id of the object in the container.
     * @param key The key you wish to delete
     * @example <MongoGo>.delete("Hello")
     *
     * // The client gets container/object literal with the key "Hello", and deletes the data and
     * // the object itself
     */
    async delete(key) {
        if (!key)
            return;
        this.schema.findOne({ key }, async (err, data) => {
            if (err)
                throw err;
            if (data)
                await data.delete();
        });
        this.MongoGoCollection.delete(key);
    }
    /**
     * Gets data from the database using a "key" given and returns an Object literal.
     * @param key The key you wish to get data
     * @example <MongoGo>.get('Hello')
     *
     * // The client uses the key provided as an id to search for the data in the database and returns nothing if no data is found.
     */
    async get(key) {
        if (!key)
            return;
        return this.MongoGoCollection.get(key);
    }
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
    async push(key, ...pushValue) {
        const data = this.MongoGoCollection.get(key);
        const values = pushValue.flat();
        if (!Array.isArray(data))
            throw Error(`You can't push data to a ${typeof data} value!`);
        data.push(pushValue);
        this.schema.findOne({ key }, async (_err, res) => {
            res.value = [...res.value, ...values];
            res.save();
        });
    }
    /**
     * @returns Cached data with self-made Collection class
     */
    async collection() {
        return this.MongoGoCollection;
    }
}
exports.MongoGo = MongoGo;
exports.default = MongoGo;
