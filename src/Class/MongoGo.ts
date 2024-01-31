import { connection, model, Schema, SchemaTypes, connect } from "mongoose";
import { MongoGoSchema } from "../Interfaces/MongoGoSchema";
import { Collection } from "../Utility/Collection";

const mix = SchemaTypes.Mixed;
const { readyState } = connection;

class MongoGo {
    private schema = model<MongoGoSchema>(
        "MongoGo-Collection",
        new Schema({
            key: String,
            value: mix,
        })
    );

    private MongoGoCollection: Collection<string, any> = new Collection();

    constructor(MongoURI: string) {
        if (readyState !== 1) {
            if (!MongoURI) {
                throw new Error(
                    "A connection with MongoDB was not established, you did not provide a MongoURI!"
                );
            }
        }

        connect(MongoURI);

        this.ready();
    }

    private async ready(): Promise<void> {
        const data = await this.schema.find({});
        data.forEach(({ key, value }) => {
            this.MongoGoCollection.set(key, value);
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
    public async set(key: string, value: any): Promise<void> {
        if (!key || !value) return;
        let data = await this.schema.findOne({ key });
        if (data) {
            data.value = value;
        } else {
            data = new this.schema({ key, value });
        }
        await data.save();
        this.MongoGoCollection.set(key, value);
    }

    /**
     * Removes data from the database using the "key" as the id of the object in the container.
     * @param key The key you wish to delete
     * @example <MongoGo>.delete("Hello")
     * 
     * // The client gets container/object literal with the key "Hello", and deletes the data and
     * // the object itself
     */
    public async delete(key: string): Promise<void> {
        if (!key) return;
        const data = await this.schema.findOne({ key });
        if (data) {
            await data.delete();
        }
        this.MongoGoCollection.delete(key);
    }

    /**
     * Gets data from the database using a "key" given and returns an Object literal.
     * @param key The key you wish to get data
     * @example <MongoGo>.get('Hello')
     * 
     * // The client uses the key provided as an id to search for the data in the database and returns nothing if no data is found.
     */
    public async get(key: string): Promise<any> {
        if (!key) return;
        return this.MongoGoCollection.get(key);
    }

    /**
     * Pushes data to an array using a "key" given,
     * can be used when handling multiple values in a key. However, only Object
     * or Array-like formats are available for the value to be push, otherwise an error is called.
     * @param key The key you wish to push data to
     * @example <MongoGo>.push("Hello", ["World", "Earth", "Moon"])
     * 
     * // The client first checks if the value is an array, if not an error is thrown
     * // Otherwise, the value is then pushed into the data
     */
    public async push(key: string, ...pushValue: string[]): Promise<void> {
        const data = this.MongoGoCollection.get(key);
        const values = pushValue.flat();
        if (!Array.isArray(data)) {
            throw Error(`You can't push data to a ${typeof data} value!`);
        }
        data.push(pushValue);
        const res = await this.schema.findOne({ key });
        if (res) {
            res.value = data;
            await res.save();
        } else {
            await this.set(key, data);
        }
    }

    /**
     * @returns Cached data with self-made Collection class
     */
    public async collection(): Promise<Collection<string, any>> {
        return this.MongoGoCollection;
    }
}

export { MongoGo };
export default MongoGo;