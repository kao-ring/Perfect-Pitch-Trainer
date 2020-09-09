const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/perfectpitch");

const songSeed = [
  {
    thumbnail: "",
    href: "http://www.recipezaar.com/Baked-Turkey-Sausage-Penne-327796",
    ingredients: [
      "mozzarella cheese",
      "red pepper flakes",
      "tomato",
      "basil",
      "oregano",
      "thyme",
      "penne",
      "garlic",
      "green pepper",
      "black pepper",
      "kosher salt",
      "olive oil",
      "pasta sauce",
      "red onions",
      "red pepper",
      "turkey sausage",
    ],
    title: "Baked Turkey Sausage Penne ",
  },
];

db.Song.remove({})
  .then(() => db.Song.collection.insertMany(songSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
