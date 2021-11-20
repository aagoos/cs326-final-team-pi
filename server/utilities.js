const testData = require('./recipesData.json');
const fs = require('fs');
const instructionToStepConverter = (str) => str.split('.');

const parseRecipe = () => {
    const recipeArr = Object.values(testData);
    const imgUrl = 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=853&q=80' ;
       const parsed = recipeArr.map((recipe) => {
        return {
            id: recipe.id,
            name: recipe.name,
            steps: instructionToStepConverter(recipe.instructions),
            ingredients: recipe.ingredients,
            tags: recipe.tags,
            imgUrl
        };
    })

    return parsed;

}


const saveJson = () => {
    const recipeParsed = JSON.stringify(parseRecipe());
    fs.writeFileSync('./parsed-recipe.json', recipeParsed);
}

// saveJson();

module.exports.parseRecipe = parseRecipe;