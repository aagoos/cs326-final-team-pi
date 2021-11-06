'use strict'

//wrapper for CRUD stuff
//return all recipe results which match the query
function findAll(query){

}

//return the first recipe result which matches the query, or undefined if there are no matches
function findFirst(query){

}

//same as findFirst, but specifies an ID directly
function find(id){

}

//create a new recipe in the database
//be careful of ID collisions
function insert(data){

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