'use strict'
const express = require("express");
const db = require("./database")
const app = express();
app.use(express.json());
const port = 8080;
const client = "/../client"

//serve client files
app.use(express.static(__dirname + client));

//semi-complete code for GET requests to /recipes
app.get("/recipes", async (req, res) => {
    //send test data for now
    res.json(await db.findAll("dummy request"));
    res.end();
});

//placeholder for PUT, which will be create and update of CRUD
app.put("/recipes", async (req, res) => {

    let data = req.body; //processed request
    await db.put(data);
    
    //respond with OK
    res.statusCode = 200;
    res.end();
});

//placeholder for POST, which will be the create of CRUD
app.post("/recipes", async (req, res) => {
    //dont actually modfiy the test database, dummy request for now
    let data = {}; //processed request, dummy data
    await db.insert(data);

    //resond with OK
    res.statusCode = 200;
    res.end();
});

//placeholder for delete, which will be delete of CRUD
app.delete("/recipes", async (req, res) => {
    //dont actually modfiy the test database, dummy request for now
    let id = 1; //processed request, dummy data
    await db.remove(id);
    
    //respond with OK
    res.statusCode = 200;
    res.end();
});

//semi-complete code for GET requests to /recipes
app.get("/lookup", async (req, res) => {
    
    let id = parseInt(req.query.id);
    res.json(await db.findFirst({"id": id}));
    res.end();
});

//listen for requests
app.listen(process.env.PORT || port, () => {
    let num = process.env.PORT || port; //to make heroku happy
    console.log(`Now listening for requests on port ${num}`);
});
