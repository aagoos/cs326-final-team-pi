# Team Pi
## iPantry

Semester: Fall 2021

# Overview 

Our application allows users to specify ingredients in a virtual pantry, called iPantry. The application will automatically find recipes with all ingredients currently in the iPantry (and automatically excluding old ingredients) so users can quickly find recipes that use food they already have on hand. This innovative application allows you to specify the date you acquired an ingredient, and will automatically detect whether it can still be used, or if it is expired.

# Team Members

Alex Agoos (aagoos)

Megan Lew (lewmeg)

# User Interface

Image of the home page.

Users can add ingredients by filling in the textbox and optionally choosing a date. Clicking the (+) icon will add the ingredient. Clicking the small + icon will instead update the selected ingredient with the current name and date values. Clicking the - icon will remove the ingredient from the iPantry. Clicking the link on each recipe will bring you to the recipe page and load that recipe.
!["image of index page"](final_Index.PNG)

Image of the recipe page, ingredient tab selected. The user can read the ingredients needed for the recipe while the ingredient tab is selected.

!["image of recipe page, ingredient tab"](final_Ingredient.PNG)


Image of the recipe page, steps tab selected. The user see all steps required to make their recipe. They can also quickly switch tabs to view the required ingredients at any time. 

!["image of recipe page, steps tab"](final_Steps.PNG)

# API



## /lookup
Returns the recipe for a specified ID.

Example GET request: `curl localhost:8080/lookup?id=0`
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

## /recipes GET
Returns the all the recipes which match the query. The query uses the mongoDB syntax. Use double quotes.

Example GET request: `curl localhost:8080/recipes?search={"id":15}`
Example response: 
```json
{
    [
        {
            "_id":"61983f821023b78cdcec11bb",
            "id":15,
            "title":"Spicy Rice Casserole",
            "steps":[
                "Preheat oven to 425 degrees","Mix rice, oats, onion, bread crumbs, milk, basil, oregano, cayenne, and egg","  Press mixture into small baking dish","  Mix panko and parmesan, put on top of mixture","  Bake for 20 minutes or until crispy or browned","  (If topping starts browning too soon, cover loosely with aluminum foil",")Serve with marinara sauce"
            ],
            "ingredients":[
                "2 cup cooked rice","1/2 cup quick-cooking oats","1/2 cup onion, chopped","1/4 cup panko","1/4 cup milk","1 tbsp italian seasoning","1/8 tsp cayenne pepper","1 large egg, beaten","1/2 cup panko","1/4 cup parmesan cheese","4 serving [marinara sauce](http://www.xanthir.com/recipes/showrecipe.php?id=id34)"
            ],
            "tags":["vegetarian","rice","main"]
        }
    ]
}
```

## /recipes POST
Adds a new recipe to the database. Does nothing if a recipe with that ID already exists (compare: /recipes PUT)

Example POST request: `curl -d '{"id": 10, "title": ham, "ingredients":["ham"], "steps":["eat"], "tags":[]}' -H 'Content-Type: application/json' -X POST localhost:8080/recipes`

Example response: 
HTTP 200: OK

## /recipes PUT
Adds a new recipe to the database. Replaces an existing recipe with the same ID, should one exist (compare: /recipes POST)

Example PUT request: `curl -d '{"id": 10, "title": ham, "ingredients":["ham"], "steps":["eat"], "tags":[]}' -H 'Content-Type: application/json' -X PUT localhost:8080/recipes`

Example response: 
HTTP 200: OK

## /recipes DELETE
Deletes a recipe with the given ID from the database. Does nothing if no recipe has the given ID.

Example DELETE request: `curl -d '{"id": 5}' -H 'Content-Type: application/json' -X DELETE localhost:8080/recipes`

Example response: 
HTTP 200: OK

# Database

The database is used to hold recipes, and to respond to API requests. It is a MongoDB atlas database. The database has one database, named `data`. One collection is named `recipes`. Each document in the `recipes` collection represents an individual recipe.

Example document

```json

{
    "_id":{"$oid":"61983f821023b78cdcec11b6"},
    "id":{"$numberInt":"5"},
    "title":"Vegetarian Chili",
    "steps":
        ["In a large (6qt), heavy pot, heat the oil over medium-high heat"," Add the onions, bell peppers, garlic, and serrano peppers, and cook, stirring, until soft, about 3 minutes"," Add the zucchini and mushrooms, and cook, stirring, until soft and the vegetables give off their liquid and start to brown around the edges, about 6 minutes"," Add the chili powder, cumin, salt and cayenne, and cook, stirring, until fragrant, about 30 seconds"," Add the tomatoes and stir well"," Add the beans, tomato sauce, and vegetable stock, stir well, and bring to a boil"," Reduce the heat to medium-low and simmer, stirring occasionally, for about 20 minutes","Remove from the heat and stir in the cilantro and lime juice"," Adjust the seasoning, to taste","To serve, place 1/4 cup of brown rice in the bottom of each bowl"," Ladle the chili into the bowls over the rice"," Top each serving with a dollop of sour cream and spoonful of avocado or [guacamole](http://www","xanthir","com/recipes/showrecipe","php?id=28)"," Sprinkle with [Essence](http://www","xanthir","com/recipes/showrecipe","php?id=id4) and green onions and serve"],
    "ingredients":
        ["2 tablespoon canola oil","1 1/2 cup yellow onions, chopped","1 cup red bell peppers, chopped","2 tablespoon garlic, minced","2 serrano peppers, stemmed, seeded, and minced","1 medium zucchini, stem ends trimmed and cut into small dice","5 large portobello mushrooms, stemmed, wiped clean and cubed","2 tablespoon chili powder","1 tablespooon ground cumin","1 1/4 teaspoon salt","1/4 teaspoon cayenne","4 large tomatoes, peeled, seeded and chopped","2 can black beans, rinsed and drained","1 15oz can tomato sauce","1 cup vegetable stock, or water","1 lime, juiced","1/4 cup cilantro, chopped","<hr>","Cooked brown rice, accompaniment","Sour cream or strained plain yogurt, garnish","Diced avocado or guacamole, garnish","Essence, garnish","Chopped green onions, garnish"],
    "tags": 
        ["chili","soup","vegetarian","main"],
    "imgUrl":"https://th.bing.com/th/id/R.2d839a854f29f3442fddd4f8a1cac512?rik=OuwiIVPmGASk9Q&riu=http%3a%2f%2f2.bp.blogspot.com%2f-NsZYUc-LEek%2fUO8xk4hsu5I%2fAAAAAAAABR0%2fLK2pYHr5WYE%2fs1600%2fVegetarian%2bChili.jpg& ehk=TMg%2bacZf4rOlcSjOTvCXNeNZwkc9RcG0zQ7wpN%2fc0us%3d&risl=&pid=ImgRaw&r=0"
    }
```

The other collection is named `users`

Example Document:

```json
{
    "_id":{"$oid":"61b52813f6e4e7311eb9b912"},
    "username":"test","hash":"56a14d886e72db3f40e9966ec7b4c31c9740b1cb91c0811ef8deec7e1dbeec21cb089c7704a599316b12a5efe0a0631a80abde8d59cd54c83e5b0908a0ab8068",
    "salt":"aabb4be6498bc89d9c390380b2c4ef0b",
    "favorites":[12, 35]}
```

# URL Routes / Mapping

Get requests made to the root directory are mapped to the /client folder.

# Authentication/Authorization

All users have access to the home and recipe page. When logged in, a users favorites are stored/retried from the database.

Authoization related URL mappings include

`/favorites`

Which GETS or POSTS the current user's favorites. You must be logged in to access this.


`/login`

Makes a request to authenticate a user. 

`/logout`

Logs out a user and clears their session.

`/register`

Creates a new user.

and 

`/user`

Which returns the name of the current user. You must be authenticated to access this.

# Division of labor

## Alex

Worked on API endpoints in server.js, implemented database logic in the database.js wrapper, setup/configured heroku, worked on documentation, took screenshots for this document, expanded greatly on index.js, general bugfixes, along with a bit of standardization in our data sources (which were retrieved and merged by Megan). Worked on the initial version of server.js to configure it to serve html/js/css. Wrote filter/results table for index.html, and the correspinding css. Worked on authentication, did initial versions of login page, wrote javascript for login page. Wrote script and edited together demo video. Implemented favorites on home page.

## Megan

Came up with the recipe idea for our project, posted summary for project idea on slack, generated design layout for recipe page on wireframe, improved design and layout for home page on wireframe, wrote HTML, CSS and front-end implementation for recipe page, wrote DELETE in server.js, found recipe database, converted recipe data into appropriate JSON format, implemented findAll and findFirst in database.js, implemented POST and DELETE in server.js, hand-selected and added 300+ recipe images to the database, fixed many design/layout issues such as overlapping text and image scaling on the recipe page, made the home page and recipe page images uniform, designed and implemented the layout for the login page in HTML/CSS, found and added the pantry background graphic to the home page, added a favicon, posted all screenshots to slack from team message history for milestones 2 and beyond, recorded my parts of the video and uploaded the final video to YouTube.

# Conclusion

## Alex

### Design

The design process was novel. When working alone, I have no one else to discuss design related ideas with, and having a team to bounce ideas off of overall I feel lead to a much better interface than I could have produced alone. 

### Challenges

Learning to work with HTML/CSS was hard for me, as I am much more comfortable with backend code than frontend / design oriented things. I did improve my HTML/CSS skills significantly however. Also, learning how to handle async code in node.js was somewhat unintuitive and took a while to get the hang of (at least enough to get the site working). As my experience with javascript is limited, I ran into a few javascript quirks that took me a long time to solve (who knew JSON.stringify replaced RegExp objects with {}? I didn't). Overall, I was able to overcome these challenges and become a better programmer.

### If I could start over...

If I knew going in how much actual in code processing of ingredients would be needed, I probably would have managed them differently. Currently it is tightly connected to the HTML, but it would have been better to store the ingredients internally, instead of having to extract them from HTML elements when they are needed for processing.

## Megan

### Design

As for what I have learned through the design and implementation process, I have learned how to create a clean HTML, CSS layout, manipulate the DOM, make fetch requests using JavaScript and how to create a dynamic web page. I understand now how the client communicates with the server and how to create and manage a database, and how the server acts as a middleware between the client and database. I also learned how to make CRUD API using node.js, express and mongodb.

### Challenges

Some challenges for me were writing back-end APIs, parsing the client data and validating it before making a database query. On the client side, updating the home page and recipe page dynamically and also manipulating the DOM while maintaining the styling and DOM structure was challenging as well. It was difficult to get certain aspects of the design to look the way we wanted. For example, the pantry background on the home page was initially blurry, cut off on the sides and would zoom in when the content overflowed. However, after some tweaking I figured out how to fix these issues.

### If I could start over...

For front-end design, I would learn responsive design, i.e. having a fitted screen and scaling the page without anything getting cropped, which would give a better user experience for all media screens. For back-end design, I would use unit testing for back-end APIs and integrate the unit test to GitHub so the production application will not break if there are any errors. Generally, I would learn how to manage and architecture my project so that it will be easy to maintain and scale. I would either figure out a better way to generate images for the recipe data instead of finding and adding them all manually or look more extensively for a database that matches our recipe format.