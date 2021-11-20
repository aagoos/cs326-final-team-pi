'use strict'

const fs = require("fs");
const path = require("path")

const { MongoClient } = require('mongodb');
const { parseRecipe } = require('./utilities');
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
async function findAll(){
    const database = client.db("data");
    const Recipe = database.collection('recipes');
    const recipes = await Recipe.find({}).toArray();
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

//exports
module.exports.find = find;
module.exports.findAll = findAll;
module.exports.findFirst = findFirst;

module.exports.insert = insert;
module.exports.put = put;
module.exports.remove = remove;