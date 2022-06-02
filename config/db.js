const mongoose = require('mongoose');


const dbConnect = async () => {

    const URI = "mongodb://localhost:27017/productSearchFilter";

    try {

        await mongoose.connect(URI, {
            useNewUrlParser: true,
        });

        console.log("Your are connected to mongoDB")

    } catch (error) {

        console.log("Error to connect on database");
        console.log(error);
    }
}

module.exports = dbConnect;