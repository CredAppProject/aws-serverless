const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bcrypt = require('bcrypt');
require("dotenv").config();

// Assuming User is your Mongoose model
const User = require('./User'); 

exports.handler = async (event) => {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

    try {
        await client.connect();

        const database = client.db(process.env.DATABASE_NAME);
        const collection = database.collection(process.env.COLLECTION_NAME);

        // Parse the username and password from the event body
        const body = JSON.parse(event.body);
        const email = body.email;
        const password = body.password;


        const query = { "email": email };
        const user = await collection.findOne(query);

        if(user && user.validPassword(password)) {
            return {
                statusCode: 200,
                body: JSON.stringify('Login successful'),
            };
        } else {
            return {
                statusCode: 401,
                body: JSON.stringify('Invalid username or password'),
            };
        }
    } catch (err) {
        console.log(err.stack);
        return {
            statusCode: 500,
            body: JSON.stringify('An error occurred'),
        };
    } finally {
        await client.close();
    }
};
