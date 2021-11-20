'use strict'
const e = require("express");
const express = require("express");
const db = require("./database")
const app = express();
const port = 8080;
const client = "/../client"

//serve client files
app.use(express.static(__dirname + client));
app.use(express.json());

//code for GET requests to /recipes
app.get("/recipes", async (req, res) => {
    //pre-parse to avoid regex deserialization errors in JSON parser
    res.json(await db.findAll(JSON.parse(req.query.search, (k, v) => {
        if(k.toString().startsWith("__REGEX__")){
            k = k.replace(/__REGEX__[\"|\']/, "").replace(/[\"|\']__REGEX__/, "");
        }
        return k;
    })));
    res.end();
});

//for PUT, which will be create and update of CRUD
app.put("/recipes", async (req, res) => {

    let data = req.body; //processed request
    await db.put(data);
    
    //respond with OK
    res.statusCode = 200;
    res.end();
});

//for POST, which will be the create of CRUD
app.post("/recipes", async (req, res) => {

    const {body} = req;
    if(!body.id || !body.steps && !body.ingredients || !body.name){
        res.status(403).send('Please add all the required fields');
        res.end();
    }
    else if(await db.findFirst({'id':body.id}) !== null){ //if the element is ALREADY PRESENT, fail
        res.status(403).send('Entry with id ' + body.id + " already exists. If you meant to update, use PUT instead of POST.");
        res.end();
    }

    const data = {
        id: body.id,
        name: body.name,
        steps: body.steps,
        ingredients: body.ingredients,
    }

    // if there are tags, it will add the tags into the data
    if(body.tags) data.tags = body.tags;
    // if there is imgUrl, it will add the imgUrl into the data
    if(body.imgUrl) data.imgUrl = body.imgUrl;
    const recipe = await db.insert(data);

    res.status(200).send(recipe);
    res.end();
});

//for delete, which will be delete of CRUD
app.delete("/recipes", async (req, res) => {
    const {body} = req;
    if(!body.id){
        res.status(403).send('ID is required.');
    }

    await db.remove(body.id);
    
    //respond with OK
    res.statusCode = 200;
    res.end();
});

//complete code for GET requests to /recipes
app.get("/lookup", async (req, res) => {

    let id = req.query.id;
    if(!req.query.id){
        res.status(403).send('ID is required.');
    }
    res.json(await db.findFirst({"id": parseInt(id)}));
    res.end();
});

//listen for requests
app.listen(process.env.PORT || port, () => {
    let num = process.env.PORT || port; //to make heroku happy
    console.log(`Now listening for requests on port ${num}`);
});
