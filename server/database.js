'use strict'

const fs = require("fs");
const path = require("path")

const { MongoClient } = require('mongodb');
const { parseRecipe } = require('./utilities');
const miniCrypt = require("./miniCrypt");
const passport = require("passport");
const uri = process.env.CONNECTION_URI || require(path.resolve(__dirname, "./secret.json")).key;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

start();

function start(){
    (async() => await client.connect())();
}

//add test data
async function addMany(){
    console.log('add many');
    const database =  client.db("data").collection("recipes");
    const recipes = parseRecipe();
    await collection.insertMany(recipes);
}
//wrapper for CRUD stuff
//return all recipe results which match the query
async function findAll(query){
    const database = client.db("data");
    const recipe = database.collection('recipes');
    const recipes = await recipe.find(query).toArray();
    return recipes;
}

//return the first recipe result which matches the query, or undefined if there are no matches
async function findFirst(query){
    const database = client.db("data");
    const Recipe = database.collection('recipes');
    const recipe = await Recipe.findOne(query);
    return recipe;
}

//same as findFirst, but specifies an ID directly
async function find(id){
    return await findFirst({'id': id});
}

//create a new recipe in the database
//be careful of ID collisions
async function insert(data){
    const database = client.db("data");
    const Recipe = database.collection('recipes');

    //messes with mongo if it is present
    delete data._id;

    const recipe = await Recipe.insertOne(data);
    return data;
}

//update or create a recipe (will replace a recipe with the same id)
//be careful of ID collisions
async function put(data){

    //the entry if is present in the database already, NULL otherwise
    const entry = await findFirst({'id': data.id});
    const present = entry === null ? false : true;
    const collection = client.db("data").collection("recipes");

    //messes with mongo if it is present
    delete data._id;

    //create if absent
    if(!present){
        collection.insertOne(data);
    }
    //update if present
    else {
        collection.replaceOne({"_id":entry._id}, data);
    }

}

//delete a recipe with the specified id. Does nothing if the ID was not present.
async function remove(id) {
    const database = client.db("data");
    const Recipe = database.collection('recipes');
    await Recipe.deleteOne({'id': id});
}

//checks a username and password against the database. If the user should be authenticated, return true, otherwise false.
async function auth(username, password) {

    const m = new miniCrypt();

    //get the user
    const database = client.db("data");
    const users = database.collection('users');
    const user = await users.findOne({'username': username});

    //if the user does not exist, fail
    if(user === null){
        return false;
    }

    //authenticate
    return m.check(password, user['salt'], user['hash']);
}

//creates a username and password in the database. If the user was created return true, otherwise (if duplicate username) false.
async function createUser(username, password) {

    const m = new miniCrypt();

    //get the user
    const database = client.db("data");
    const users = database.collection('users');
    const user = await users.findOne({'username': username});

    //if the user already exists, fail
    if(user !== null){
        return false;
    }

    //create the account
    const crypt = m.hash(password);
    const salt = crypt[0];
    const hash = crypt[1];
    await users.insertOne({'username': username, 'hash': hash, 'salt':salt, favorites: []});
    return true;
}

//returns the favorites for a user. IMPORTANT: Does not check authentication, do that before calling this function.
async function getFavorites(username){
    const database = client.db("data");
    const users = database.collection('users');
    const user = await users.findOne({'username': username});
    if(user === null){
        return []; //the user does not exist
    }
    else {
        return user['favorites'];
    }
}

//updates the favorites for a user. IMPORTANT: Does not check authentication, do that before calling this function.
async function setFavorites(username, favorites){
    const database = client.db("data");
    const users = database.collection('users');
    await users.updateOne({'username': username}, {"$set": {'favorites': favorites}});
}

//exports
module.exports.find = find;
module.exports.findAll = findAll;
module.exports.findFirst = findFirst;

module.exports.insert = insert;
module.exports.put = put;
module.exports.remove = remove;

module.exports.auth = auth;
module.exports.createUser = createUser;
module.exports.getFavorites = getFavorites;
module.exports.setFavorites = setFavorites;


