const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose")



require("dotenv").config()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true})

const connection = mongoose.connection

connection.once('open', ()=>{
    console.log("MongoDB database connection established successfully.")
}) 

const exerciseRouter = require('./routes/exercise');
const usersRouter = require('./routes/users')

app.use('/exercises', exerciseRouter);
app.use('/users', usersRouter);
app.use(express.static(path.join(__dirname, "client", "build")));

// tells Heroku to run the following path if node environment is running in prod
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// a 'catch all' route handler.  needs to be near the bottom of the file so that it will only be enacted if the API routes above it don't handle the request
// it's in charge of sending the main index.html file back to the client if it didn't receive a request it recognized otherwise
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, ()=>{
    console.log("SERVER IS RUNNING ON PORT " +port)
})