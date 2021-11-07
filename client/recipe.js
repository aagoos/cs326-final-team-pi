/* Author: Megan Lew */

// getRecipeData makes a GET request to /recipes to get the recipe data from a server
const getRecipeData = async() => {
    try {
        const data = await fetch('/recipes');
        const dataJSON = await data.json();
        return dataJSON.recipes;
    } catch (error) {
        console.log(error);
    }
}

// handles DOM operations i.e. updating instructions
const domHandler = async () => {

// waits until we get recipe data response from server
const recipeData = await getRecipeData();
console.log(recipeData);
//DOM elements
const recipeNameSection = document.getElementById('recipe-name');
const recipeDetails = document.getElementById('recipe-details');
const ingredientsTab = document.getElementById('ingredient-tab');
const instructionsTab = document.getElementById('instruction-tab');

// function to get the active recipe by ID
function getActiveRecipe(id){
    return recipeData.find((item) => item.id === id);
}

// function to update instructions or ingredients area
const updateDetails = (details, type) => {
    const detailsDom = recipeDetails.querySelector('.recipe-detail-list');
        const detailsHTMLTemplate = details.map((detail) => {
            return `<li class="recipe-detail-item">${detail}</li>`
        }).join(' ');
        detailsDom.innerHTML = detailsHTMLTemplate;
        const tabList = document.querySelectorAll('.recipe-tab');

        // keeps track of active state of tabs
        if(type==='ingredient'){
            tabList[0].classList.add('recipe-tab-active');
            tabList[1].classList.remove('recipe-tab-active');
        } else {
            tabList[1].classList.add('recipe-tab-active');
            tabList[0].classList.remove('recipe-tab-active');
        }

}

// function to update template with database recipe data
function updateRecipe(){
    // gets active recipe using ID
    const recipe = getActiveRecipe(1);
    // checks if recipe exists
    if(recipe){
        // destructure recipe property values
        const {ingredients, tags, steps, title: name}= recipe;
        // updates recipe title
        recipeNameSection.querySelector('.recipe-subheading').textContent = name;
        // select recipe tags container
        const tagsDom = recipeNameSection.querySelector('.recipe-tags');
        // converts our tags array into HTML string
        const tagsHTMLTemplate = tags.map((tag) => {
            return `<span class="badge rounded-pill bg-success">${tag}</span>`
        }).join(' ');
        // replace inner HTML with our dynamic HTML
        tagsDom.innerHTML = tagsHTMLTemplate;
        updateDetails(steps, 'step');
    }
}

getRecipeData();

// when user clicks ingredients tab it becomes active
ingredientsTab.addEventListener('click', () => {
    const recipe = getActiveRecipe(1);
    if(recipe){
        const { ingredients } = recipe;
        updateDetails(ingredients, 'ingredient');
    }
})

// when user clicks instructions tab it becomes active
instructionsTab.addEventListener('click', () => {
    const recipe = getActiveRecipe(1);
    if(recipe){
        const { steps } = recipe;
        updateDetails(steps, 'steps');
    }
})

updateRecipe();

}

domHandler();