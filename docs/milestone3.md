# Database

MongoDB
database name: data
collection name: recipes

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

## _id 

Assigned by mongoDB

## id

The id assigned by us to each recipe

## title

The name of the recipe

## steps

The steps in order to complete a recipe

## ingredients

The ingredients / quantity of each ingredient in the recipe

## tags

Metadata related to the recipe's (both content and in general)

## imgUrl

A link to an image of this recipe, if one exists. May not be present.

# Contributions

## Alex 

Worked on API endpoints in server.js, implemented database logic in the database.js wrapper, setup/configured mongodb, worked on documentation, expanded greatly on index.js, general bugfixes, along with a bit of standardization in our data sources (which were retrieved and merged by Megan).