# API Planning


## /lookup
Returns the recipe for a specified ID.

Example request: `curl localhost:8080/lookup?id=0`
Example response: 
```json
{
    "id":0,
    "title":"ham + cheese = genius?",
    "ingredients":["ham","cheese","bread"],
    "steps":
    [
        "put da ham on da bread",
        "put da cheese on the ham and bread",
        "close ur sammich with more breadz"
    ],
    "tags":["dairy","wheat","gluten"]
}
```

# Screenshots

# Heroku URL

https://cs326-final-team-pi.herokuapp.com/

# Division of Labor

Adrianna: Wrote populateRecipes in index.js, wrote put in server.js 
Alex:  
Megan:  Wrote front-end implementation for recipe page in recipe.js, made changes to recipe.html and recipestyle.css and wrote delete in server.js