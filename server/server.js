'use strict'
const express = require("express");
const db = require("./database")
const app = express();
const port = 8080;
const client = "/../client"
const {connectDB} = require('./database');
connectDB();

//serve client files
app.use(express.static(__dirname + client));

//semi-complete code for GET requests to /recipes
app.get("/recipes", (req, res) => {
    //send test data for now
    res.json(db.findAll("dummy request"));
    res.end();
});

//placeholder for PUT, which will be create and update of CRUD
app.put("/recipes", (req, res) => {
    //dont actually modfiy the test database, dummy request for now
    let data = {}; //processed request, dummy data
    db.put(data);
    
    //respond with OK
    res.statusCode = 200;
    res.end();
});

//placeholder for POST, which will be the create of CRUD
app.post("/recipes", (req, res) => {
    //dont actually modfiy the test database, dummy request for now
    let data = {}; //processed request, dummy data
    db.insert(data);

    //resond with OK
    res.statusCode = 200;
    res.end();
});

//placeholder for delete, which will be delete of CRUD
app.delete("/recipes", (req, res) => {
    //dont actually modfiy the test database, dummy request for now
    let id = 1; //processed request, dummy data
    db.remove(id);
    
    //respond with OK
    res.statusCode = 200;
    res.end();
});

//semi-complete code for GET requests to /recipes
app.get("/lookup", (req, res) => {
    //send test data for now
    res.json(db.find("dummy request"));
    res.end();
});

//listen for requests
app.listen(process.env.PORT || port, () => {
    let num = process.env.PORT || port; //to make heroku happy
    console.log(`Now listening for requests on port ${num}`);
})