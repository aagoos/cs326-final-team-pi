'use strict'

const fs = require("fs");
const path = require("path")

const { MongoClient } = require('mongodb');
const mongoose = require("mongoose");
const uri = require(path.resolve(__dirname, "./secret.json")).key;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//wrapper for CRUD stuff
//return all recipe results which match the query
function findAll(query){
    //dummy response
    //load all the test data and return it
    const json = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./testData.json"), "utf-8"));
    return json;
}

//return the first recipe result which matches the query, or undefined if there are no matches
function findFirst(query){
    (async () => {
        await client.connect();

        const collection = await client.db("data").collection("recipes");
        
        //const json = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./testData.json"), "utf-8"));
        //await collection.insertMany(json.recipes)
        //console.log("test")
        
        client.close();
    })();    
}

// connects to recipes database
const connectDB = async () => {
    try {
       await mongoose.connect(`${uri}/recipes`);
       console.log('DB connected!');   
    } catch (error) {
        console.log(error);
    }
 
}

//same as findFirst, but specifies an ID directly
function find(id){
    //dummy response
    //return recipe 0
    const json = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./testData.json"), "utf-8"));
    for(let recipe of json.recipes){
        if(recipe.id === 0){
            return recipe;
        }
    }
    return undefined;
}

//create a new recipe in the database
//be careful of ID collisions
function insert(data){
    //we don't want to modify the database yet, so we do nothing here (for now)
}

//update or create a recipe (will replace a recipe with the same id)
//be careful of ID collisions
function put(data){

}

//delete a recipe with the specified id. Does nothing if the ID was not present.
function remove(id) {
    
}

//exports
module.exports.find = find;
module.exports.findAll = findAll;
module.exports.findFirst = findFirst

module.exports.insert = insert;
module.exports.put = put;
module.exports.remove = remove;

module.exports.connectDB = connectDB;