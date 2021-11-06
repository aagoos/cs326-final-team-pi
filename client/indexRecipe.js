/* Author: Megan Lew */

//DOM elements
const recipeNameSection = document.getElementById('recipe-name');
const recipeDetails = document.getElementById('recipe-details');
const ingredientsTab = document.getElementById('ingredient-tab');
const instructionsTab = document.getElementById('instruction-tab');

// data is a function returning our recipe data
const recipeData = () => {
    return(
        [{
            id: 0,
            title: "ham + cheese = genius?",
            ingredients: ["ham", "cheese", "bread"],
            steps: ["put da ham on da bread", "put da cheese on the ham and bread", "close ur sammich with more breadz"],
            tags: ["dairy", "wheat", "gluten"]
          }, {
            id: 1,
            title: "knock your socks off good: pb & j",
            ingredients: ["peanutbutter", "jelly", "bread"],
            steps: ["spread peanut butter on your favorite bread", "wait 15 minutes - IMPORTANT", "add the jelly now, and consume"],
            tags: ["fruit", "jelly", "treenuts", "peanuts", "gluten"]
          }, {
            id: 2,
            title: "grilled cheese",
            ingredients: ["cheese", "bread"],
            steps: ["preheat oven to 350", "spead cheese of your choice over the bread", "cook for 5 mintues, or until cheese melted", "remove from oven. let cool for a minute, then enjoy."],
            tags: ["wheat", "dairy", "gluten"]
          }]
    )
}

// function to get the active recipe by ID
function getActiveRecipe(id){
    const recipes = recipeData();
    return recipes.find((item) => item.id === id);
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

updateRecipe();

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


