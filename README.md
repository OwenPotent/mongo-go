## MongoGo

An easy to use database handler for MongoDB, inspired by quick.db! MongoGo handles the hard part in getters, setters, and much more!

## Installation

Using NPM:

```shell
npm install mongo-go
```

Using Yarn:

```shell
yarn add mongo-go
```

## Getting Started

To get started with using MongoGo, import the default class from the package.

```js
// Using Node.js `require()`
const MongoGo = require("mongo-go");

// Using ES6 imports
import MongoGo from "mongo-go"
```

## Overview

**Connecting to MongoDB**

First, we need to establish a connection. MongoGo handles it easily by defining a new `instance` of MongoGo. A function `<MongoGo>.ready()` is then fired when you start your app. The only parameter needed is a `MongoURI` or if your using a localhost, use `mongodb://localhost:27017/my_database`.

Here is an example:

```js
const MongoClient = new MongoGo("mongodb://localhost:27017/my_database")
```

You don't have to pass in another method to connect it by yourself, once you've started the app, it'll start a connection to the cloud and return a `Connection`.

**Important!** Due to an issue with the Mongoose's `ConnectionOptions` option, `useNewURLParser` isn't use during the connection, in some case, an error or warning might pop-up whilst connecting.

**Do we have to define a model/schema?**  
Nope, like we said, MongoGo handles it all! it uses 2 parameters in a built-in `model` we made, which are a "key" and a "value".

- A `"key"` is also the id, which is used to set a new `Object`, get the data from the `"key"` and others. The `"key"` parameter **must** always be a `String` type value.
- A `"value"` is just the data that will be stored with the `"key"` together in an `Object` literal in the database. A `"value"` can be any type of value!

### Methods

Currently, all method returns a `Promise`.

#### get

```js
const data = await <MongoGo>.get("Hello")
```

#### set

```js
await <MongoGo>.set("Hello", "World")
```

#### delete

```js
await <MongoGo>.delete("Hello")
```

#### push

```js
await <MongoGo>.push("Hello", ["World", "Earth", "Moon"...])
```

#### collection

```js
console.log(<MongoGo>.collection)
```

**Important!**  
Keep it mind that `<MongoGo>` is just an example instance, you may rename it to your own likings.