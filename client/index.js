const recipes = [{
        id: 123,
        title: "ham + cheese = genius?",
        ingredients: ["ham", "cheese", "bread"],
        steps: ["put da ham on da bread", "put da cheese on the ham and bread", "close ur sammich with more bread"],
        tags:["dairy","wheat","gluten"]
    },
    {
        id: 123,
        title: "ham + cheese = genius?",
        ingredients: ["ham", "cheese", "bread"],
        steps: ["put da ham on da bread", "put da cheese on the ham and bread", "close ur sammich with more bread"],
        tags:["dairy","wheat","gluten"]
    }
];

function populateRecipes(recipesArr){
    const container = document.getElementById("recipe-parent");
    for (let recipe of recipesArr){
        const entry = document.createElement("div");
        entry.classList.add("card");
        entry.classList.add("mb-3")
        entry.classList.add("entry")

        const row = document.createElement("div");
        row.classList.add("row");
        row.classList.add("g-0");

        const imgCol = document.createElement("div");
        imgCol.classList.add("col-md-4");
        //alter this depending on json format
        imgCol.innerHTML = `<img alt="burgah" class="img-fluid rounded-start thumbnail" src="https://static01.nyt.com/images/2021/05/17/dining/kc-korean-bulgogi-burger/kc-korean-bulgogi-burger-mobileMasterAt3x.jpg">`;

        const recipeCol = document.createElement("div");
        recipeCol.classList.add("col-md-8");

        const entryBody = document.createElement("div");
        entryBody.classList.add("card-body");
        entryBody.classList.add("entry-body");
        entryBody.id = recipe.id;

        entryBody.innerHTML += `<a href="./recipe.html"><h5 class="card-title" id="result1-name"> ${recipe.title} </h5></a>`;
        if(recipe.steps.length > 2){
            entryBody.innerHTML += `<p class="card-text">Step 1: ${recipe.steps[0]} </p>`;
            entryBody.innerHTML += `<p class="card-text">Step 2: ${recipe.steps[1]} </p>`;
            entryBody.innerHTML += `<p class="card-text">Click to see all steps </p>`;
        }
        else{
            for(let i = 0; i<recipe.steps.length; ++i){
                entryBody.innerHTML += `<p class="card-text">Step ${i}: ${recipe.steps[i]} </p>`;
            }
        }
        entryBody.innterHTML += `<p class="card-text" id="result1-tags"><small class="text-muted"> ${recipe.tags.join(", ")} </small></p>`;

        recipeCol.appendChild(entryBody);
        row.appendChild(imgCol);
        row.appendChild(recipeCol);
        entry.appendChild(row);
        container.appendChild(entry);
    }
}

window.onload = () => populateRecipes(recipes);


function addIngredient(name, date) {
    const container = document.getElementById("ingredients").getElementsByClassName("ingredient-list")[0];
    let ingredient = document.createElement("div");
    ingredient.classList.add("ingredient");

    let nameField = document.createElement("span");
    nameField.id = name;
    nameField.innerText = name + " " + date;

    ingredient.appendChild(nameField);

    let updateButton = document.createElement("button");
    updateButton.type = "button";
    updateButton.classList.add("update-ingredient");
    updateButton.innerHTML = "<b>+</b>"

    ingredient.appendChild(updateButton);

    container.appendChild(ingredient);
}

//listeners for buttons
document.getElementById("add-button").addEventListener('click', () => {
    const datepicker = document.getElementById("date-picker");
    const name = document.getElementById("ingredient-name").value;
    const date = datepicker.value;
    addIngredient(name , date);
});