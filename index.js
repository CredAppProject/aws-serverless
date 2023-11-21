const mongoose = require('mongoose');
require("dotenv").config();

// Assuming User is your Mongoose model
const User = require('./User'); 

exports.handler = async (event) => {
    const uri = process.env.MONGODB_URI;
    try {
        await mongoose.connect(uri);

        // Parse the username and password from the event body
        const body = JSON.parse(event.body);
        const email = body.email;
        const password = body.password;

        const user = await User.findOne({ email: email });
        
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
        await mongoose.connection.close();
    }
};
