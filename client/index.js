const { ENETRESET } = require("constants");
const e = require("express");

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
        parent.appendChild(entry);
    }
}