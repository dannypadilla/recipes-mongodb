'use strict';
// Danny Padilla

const MongoClient = require("mongodb").MongoClient;

let recipes = [
    {
	"name": "special potato beef",
	"yield": 2,
	"ingredients": [
	    {
		"name": "salt",
		"qty": 1
	    },
	    {
		"name": "oil",
		"qty": 2
	    },
	    {
		"name": "beef",
		"qty": 1
	    },
	    {
		"name": "potato",
		"qty": 2
	    }
	],
	"directions": [
	    "chop potato",
	    "oil pan",
	    "add potato to pan",
	    "cook for 30 minutes",
	    "add beef to pan",
	    "cook for 10 minutes",
	    "serve"
	]
    },
    {
	"name": "veggie delight",
	"yield": 1,
	"ingredients": [
	    {
		"name": "salt",
		"qty": 1
	    },
	    {
		"name": "oil",
		"qty": 1
	    },
	    {
		"name": "potato",
		"qty": 2
	    },
	    {
		"name": "carrot",
		"qty": 2
	    }
	],
	"directions": [
	    "chop potato",
	    "chop carrot",
	    "oil pan",
	    "add potato to pan",
	    "add carrot to pan",
	    "cook for 30 minutes",
	    "serve"
	]
    },
    {
	"name": "bored bread",
	"yield": 4,
	"ingredients": [
	    {
		"name": "salt",
		"qty": 1
	    },
	    {
		"name": "yeast",
		"qty": 2
	    },
	    {
		"name": "water",
		"qty": 2
	    }
	],
	"directions": [
	    "add yeast to pan",
	    "add water to pan",
	    "add salt to pan",
	    "mix",
	    "cook for 30 minutes",
	    "serve"
	]
    },
    {
	"name": "special steak",
	"yield": 2,
	"ingredients": [
	    {
		"name": "salt",
		"qty": 1
	    },
	    {
		"name": "pepper",
		"qty": 1
	    },
	    {
		"name": "steak",
		"qty": 2
	    }
	],
	"directions": [
	    "season steak with salt",
	    "season steak with pepper",
	    "cook each side for 8 minutes",
	    "serve"
	]
    }
];

let db_user = "";
let db_pw = "";
let db_server = "";
let db_port = "";
let db_url = `mongodb://${db_user}:${db_pw}@${db_server}:${db_port}/${db_user}`;

let db_collection = "recipes";

console.log(`connecting to: ${db_url}`);

async function run() {
    let client = await MongoClient.connect(db_url, { useUnifiedTopology: true} );
    let db = client.db(db_user);
    let collection = await db.collection(db_collection);  // recipe collection
    // await collection.insertMany(recipes);  // add recipe objects created above to DB

    const projection = {_id: true, name: true};  // limit output to id and name

    
/*
a.) Recipes that use the ingredients: Beef and Potato.
   - print out the id and name of Recipes found.
*/


    let query1 = await collection.find({
	$and: [
	    {"ingredients.name": "beef"},
	    {"ingredients.name": "potato"}
	]
    }).project(projection);  // should only return special potato beef

    console.log("\na.) Beef && Potato:\n");
    await query1.forEach(doc => console.log(doc) );

    
/*
b.) Recipes whose names include: steak.
   - print out the id and name of Recipes found.
   * Must use Text Search for this query.
   ** (Can create the necessary text index outside the program)
*/
    

    console.log("\n\nb.) Text Search:\n");
    

    await client.close();
}

run();
