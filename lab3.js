'use strict';
// Danny Padilla 

const MongoClient = require("mongodb").MongoClient;

let recipes = [
    {
	"name": "special beef",
	"yield": 2,
	"ingredients": [
	    {"salt": 1},
	    {"oil": 2},
	    {"beef": 1},
	    {"potato": 2}
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
	    {"salt": 1},
	    {"oil": 1},
	    {"potato": 2},
	    {"carrot": 2}
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
	    {"salt": 1},
	    {"yeast": 2},
	    {"water": 2}
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
	    {"salt": 1},
	    {"pepper": 1},
	    {"steak": 2}
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
let db_port = "4042";
let db_url = `mongodb://${db_user}:${db_pw}@${db_server}:${db_port}/${db_user}`;

let db_collection = "recipes";

console.log(`connecting to: ${db_url}`);

async function run() {
    let client = await MongoClient.connect(db_url, { useUnifiedTopology: true} );
    let db = client.db(db_user);
    let collection = await db.collection(db_collection);
    
    await collection.insertMany(recipes);  // add recipe objects created above
    await client.close();
}

run();

