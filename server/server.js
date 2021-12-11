'use strict'
const express = require("express");
const db = require("./database")
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const expSession = require('express-session');
const path = require("path");


const app = express();
const port = 8080;
const client = "/../client"

const strategy = new LocalStrategy(
    async (username, password, done) => {
        const success = await db.auth(username, password);
	    if (!success) {
	        await new Promise((x) => setTimeout(x, 2000));
	        return done(null, false, {'message' : 'Username or password incorrect'});
	    }
	    return done(null, username);
    }
);

//setup passport
const key = process.env.SESSION_KEY || require(path.resolve(__dirname, "./secret.json")).key2;
app.use(expSession({secret: key}));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((uid, done) => done(null, uid));

//serve client files
app.use(express.static(__dirname + client));
app.use(express.json());

//code for GET requests to /recipes
app.get("/recipes", async (req, res) => {
    //pre-parse to avoid regex deserialization errors in JSON parser
    const reviver = (k, v) => {
        let result = v;
        if(v !== undefined && String(v).startsWith("__REGEX__")){
            result = String(v);
            result = new RegExp(result.replace(/__REGEX__\/?/, "").replace(/\/?__REGEX__/, ""));
        }
        return result;
    }
    //in case search is empty, save it to empty object JSON
    const search = req.query.search || '{}' 
    const query = JSON.parse(search, reviver);

    res.json(await db.findAll(query));
    res.end();
});

//return the users favorites iff logged in
app.get('/favorites', async (req, res) => {
    if(req.isAuthenticated()) {
        res.json(await db.getFavorites(req.user.username))
    }
})

//update the users favorites iff logged in
app.post('/favorites', async (req, res) => {
    if(req.isAuthenticated()){
        await db.setFavorites(req.user, req.body.favorites);
        res.statusCode = 200;
    }
    else{
        res.statusCode = 403;
    }
    res.end();


})

//returns the name of the user currently logged in, if they are authenticated
app.get('/user', (req, res) => {
    if(req.isAuthenticated()){
        res.json({'user': req.user})
        res.statusCode = 200;
    }
    else {
        res.statusCode = 403;
    }
    res.end();
})

//login and register endpoints
app.post('/login', passport.authenticate('local', { successRedirect: '/index.html', failureRedirect: '/login' }));

app.post('/register', async (req, res) => {
    const {body} = req;
    const success = await db.createUser(body.username, body.password);
    if(success){
        res.statusCode = 200;
    }
    else{
        res.statusCode = 409;
        res.statusMessage = "Username already in use."
    }
    res.end();
})

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
