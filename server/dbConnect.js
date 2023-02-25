const mongoose = require('mongoose');
dotenv = require('dotenv');
dotenv.config('./.env');
module.exports = async () => {
    const url = process.env.MONGO_URL;
    try {
        const conn = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}