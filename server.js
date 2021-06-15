const express = require("express");
const mongoose = require("mongoose");

// Specifies the port used by the app to be a dynamic Heroku port or the locally hosted 300 port 
const PORT = process.env.PORT || 3000;

// Defines that the app is an express application
const app = express();

// Allows the use of JSON data by teh express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ALlows the app to make use of the files in the public folder
app.use(express.static("public"));

// Sets up the connection to the MongooseDB whether it is locally hosted or hosted through Heroku 
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
})

// Sets up the routes folder to serve as the intermediary for requests made by the front end to the backend
app.use(require("./routes"));

// The app listens for the port to be utilized and then console logs the used port 
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});