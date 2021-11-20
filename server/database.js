'use strict'

const fs = require("fs");
const path = require("path")

const { MongoClient } = require('mongodb');
const { parseRecipe } = require('./utilities');
const uri = process.env.CONNECTION_URI || require(path.resolve(__dirname, "./secret.json")).key;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
start();

function start(){
    (async() =>{
         await client.connect();
        // addMany();
        })();
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
async function insert(data){
    //we don't want to modify the database yet, so we do nothing here (for now)
}

//update or create a recipe (will replace a recipe with the same id)
//be careful of ID collisions
async function put(data){

}

//delete a recipe with the specified id. Does nothing if the ID was not present.
async function remove(id) {
    
}

//exports
module.exports.find = find;
module.exports.findAll = findAll;
module.exports.findFirst = findFirst;

module.exports.insert = insert;
module.exports.put = put;
module.exports.remove = remove;