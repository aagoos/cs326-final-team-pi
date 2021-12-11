
let recipes = [];
let favorites = [];
let ingredientTracker = [];
const trackerKey = "ingredientTracker";

const recipeReq = async () => {
    const result = await recipeRequest();
    return result;
};

async function recipeRequest() {

    const queryJSON = JSON.stringify(await generateIngredientQuery());
    const res = await fetch("./recipes?search="+queryJSON);
    let json =  await res.json();
    return json;
}

//generate and return a mongoDB query for the current ingredient list
async function generateIngredientQuery(){
    let ingreds = [];
    let ingredients = document.getElementsByClassName("ingredient");

    //if no ingredients, display all
    if(ingredients.length === 0){
        return {};
    }


    for(const elem of ingredients) {
        //exclude expired ingredients
        const text = elem.innerText.trim().replace("+-", "").split("\s+");
        if(text.length > 1) {
            const date = text[text.length - 1];
            let d = Date.parse(date);

            //ms in 1 day
            const msDay = 1000 * 60 * 60 * 24;
            const daysOld = (Date.now() - d) / msDay;

            //if the date was provided, this will be a number. Otherwise, it will be NaN
            if(!Number.isNaN(daysOld)){
                //skip adding to the query if it is too old (> 3 weeks old)
                if(daysOld > 21){
                    continue;
                }
            }
            //otherwise we have no date information, so just add it
        }

        //custom serialization to get around JSON stringify not handling regular expressions properly
        let name = elem.firstChild.id;
        name = "[" + name.substring(0,1).toLowerCase() + "|" + name.substring(0,1).toUpperCase() + "]" + name.substring(1);
        ingreds.push("__REGEX__" + new RegExp(name).toString() + "__REGEX__"); 
    }
    const query = {"ingredients": {"$all": ingreds}};
    return query;


}

async function populateRecipes(recipesArr){
    const container = document.getElementById("recipe-parent");
    container.innerHTML = '';
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
        imgCol.innerHTML = `<img alt="burgah" class="img-fluid rounded-start thumbnail" src="${recipe.imgUrl}">`;

        const recipeCol = document.createElement("div");
        recipeCol.classList.add("col-md-8");

        const entryBody = document.createElement("div");
        entryBody.classList.add("card-body");
        entryBody.classList.add("entry-body");
        entryBody.id = recipe.id;

        const favIconPath = favorites.indexOf(recipe.id) >= 0 ? "./fav.png" : "./notfav.png";

        entryBody.innerHTML += `<img id=${recipe.id}-icon src=${favIconPath} alt="favorite" width="40" height="40"></img>`;
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

        //add a listener for the entry
        entry.addEventListener('click', () => {
            window.localStorage.setItem("lastClicked", String(recipe.id));
        })

        container.appendChild(entry);

        //add a listener for the favorites
        const imgId = `${recipe.id}-icon`;
        const img = document.getElementById(imgId);
        img.addEventListener('click', async () => {
            //remove/add this as a favorite

            //remove
            console.log(document.getElementById(imgId).getAttribute('src'));
            if(document.getElementById(imgId).getAttribute('src') === "./fav.png"){
                console.log("hello?")
                img.setAttribute('src', "notfav.png");
                if(favorites.length === 1){
                    favorites = [];
                }
                else{
                    favorites = favorites.splice(favorites.indexOf(recipe.id), 1);
                }
            }
            else{ //add
                img.setAttribute('src', "fav.png");
                favorites.push(recipe.id);
            }

            //update the users favs
            await fetch('./favorites', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'favorites': favorites})
            });
            sortFavorites();
        })
    }
}

window.onload = () => {
    //set the date to today
    const today = new Date();
    const theDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate());
    //YYYY-MM-DD
    document.getElementById("date-picker").value = theDate; 

    (async () => {
        //set the username
        const response = await fetch("./user");
        if(response.status === 200){
            //display the username instead of log in
            const json =  await response.json();
            document.getElementById("login-text").innerText = "Signed in as: " + json['user'];

            //kill the link to the login page.
            document.getElementById("login-link").setAttribute('href', '#!');

            //load favorites
            const favRes = await fetch("./favorites");
            if(favRes.status = 200) {
                const favJson = await favRes.json();
                favorites = favJson['favorites'];
            }
        }
        
        try {

            if(window.localStorage.getItem(trackerKey) === null){
                window.localStorage.setItem(trackerKey, JSON.stringify({list: []}));
            }
            else {
                const ings = JSON.parse(window.localStorage.getItem(trackerKey));
                for (let i = 0; i < ings.length; i++) {
                    addIngredient(ings[i]['name'], ings[i]['date']) 
                }
            }

            recipes = await recipeReq();
            sortFavorites();
        }
        catch(err){
            console.log("failed to fetch recipes" + err)
        }
    })();

};


//add a new ingredient
function addIngredient(name, date) {
    const container = document.getElementById("ingredients").getElementsByClassName("ingredient-list")[0];
    
    //create an ingredient entry
    let ingredient = document.createElement("div");
    ingredient.classList.add("ingredient");

    //create the entry with the name
    let nameField = document.createElement("span");
    nameField.id = name;
    nameField.innerText = name + " " + date;

    //if name is empty terminate and alert user
    if(name === ''){
        alert("Must specify an ingredient name");
        return;
    }

    ingredient.appendChild(nameField);

    //append update and delete buttons
    appendIngredientButtons(ingredient, container);

    container.appendChild(ingredient);

    //add it to the ingredientTracker
    ingredientTracker.push({"name": name, "date":date, "text": nameField.innerText});
    window.localStorage.setItem(trackerKey, JSON.stringify(ingredientTracker));

    //repopuluate
    (async () => {
        recipes = await recipeReq();
        await populateRecipes(recipes);
    })()
}

//appends the update/delete buttons to an ingredient
function appendIngredientButtons(elem, container){
        //create the update button
        let updateButton = document.createElement("button");
        updateButton.type = "button";
        updateButton.classList.add("update-ingredient");
        updateButton.innerHTML = "<b>+</b>"
    
        //add the listener for the update button
        updateButton.addEventListener("click", () => {
            updateIngredient(elem, container);
        })
    
         //create the delete button
         let deleteButton = document.createElement("button");
         deleteButton.type = "button";
         deleteButton.classList.add("update-ingredient");
         deleteButton.innerHTML = "<b>-</b>"
    
         //add the listener for the delete button
        deleteButton.addEventListener("click", () => {

            //update the ingredient tracker
            ingredientTracker = ingredientTracker.filter(e => e.text.trim() !== elem.innerText.replace("+-", "").trim());
            window.localStorage.setItem(trackerKey, JSON.stringify(ingredientTracker));

            container.removeChild(elem);


            //repopuluate
            (async () => {
                recipes = await recipeReq();
                await populateRecipes(recipes);
            })()
        })
    
        elem.appendChild(updateButton);
        elem.appendChild(deleteButton);
}

//update an existing ingredient
function updateIngredient(elem, container){
    const datepicker = document.getElementById("date-picker");
    const name = document.getElementById("ingredient-name").value;
    const date = datepicker.value;

    //remove old item from the tracker
    ingredientTracker = ingredientTracker.filter(e => e.text !== elem.firstChild.innerText.replace("+-",""));

    elem.innerHTML = '';

    let span = document.createElement("span");

    span.id = name;
    span.innerText = name + " " + date;
    elem.appendChild(span);

    //repopuluate
    (async () => {
           //update the ingredientTracker
        ingredientTracker.push({"name": name, "date":date, "text": elem.firstChild.innerText});
        window.localStorage.setItem(trackerKey, JSON.stringify(ingredientTracker));
        appendIngredientButtons(elem, container);

        recipes = await recipeReq();
        await populateRecipes(recipes);
    })()
}

//move favs to top
function sortFavorites() {
    favorites.forEach(id => {
        //move recipes to the front
        let index = recipes.findIndex(r => r.id === id);
        if(index > 0){
            const e = recipes[index];
            recipes.splice(index, 1);
            recipes.unshift(e);
        }
    });
    (async () => await populateRecipes(recipes))();
}

//listeners for buttons
document.getElementById("add-button").addEventListener('click', () => {
    const datepicker = document.getElementById("date-picker");
    const name = document.getElementById("ingredient-name").value;
    const date = datepicker.value;
    addIngredient(name , date);
});