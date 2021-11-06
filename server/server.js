'use strict'
const express = require("express");
const db = require("./database")
const app = express();
const port = 8080;
const client = "/../client"

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
    
});

//placeholder for POST, which will be the create of CRUD
app.post("/recipes", (req, res) => {
    
});

//placeholder for delete, which will be delete of CRUD
app.delete("/recipes", (req, res) => {
    
});

//semi-complete code for GET requests to /recipes
app.get("/lookup", (req, res) => {
    //send test data for now
    res.json(db.find("dummy request"));
    res.end();
});

//listen for requests
app.listen(port, () => {
    console.log(`Now listening for requests on port ${port}`);
})