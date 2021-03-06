const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/perfectpitch");

const songSeed = [
  {
    title: "Cmajor_001",
    notes: [
      { midiNumber: 60, time: 0, duration: 0.5 },
      { midiNumber: 62, time: 0.5, duration: 0.5 },
      { midiNumber: 64, time: 1.0, duration: 0.5 },
      { midiNumber: 65, time: 1.5, duration: 0.5 },
      { midiNumber: 67, time: 2.0, duration: 0.5 },
      { midiNumber: 65, time: 2.5, duration: 0.5 },
      { midiNumber: 64, time: 3.0, duration: 0.5 },
      { midiNumber: 62, time: 3.5, duration: 0.5 },
      { midiNumber: 60, time: 4.0, duration: 2.0 },
    ],
    level: "Level_01",
  },
  {
    title: "Cmajor_002",
    notes: [
      { midiNumber: 60, time: 0, duration: 0.5 },
      { midiNumber: 64, time: 0.5, duration: 0.5 },
      { midiNumber: 62, time: 1.0, duration: 0.5 },
      { midiNumber: 65, time: 1.5, duration: 0.5 },
      { midiNumber: 64, time: 2.0, duration: 0.5 },
      { midiNumber: 67, time: 2.5, duration: 0.5 },
      { midiNumber: 65, time: 3.0, duration: 0.5 },
      { midiNumber: 62, time: 3.5, duration: 0.5 },
      { midiNumber: 60, time: 4.0, duration: 2.0 },
    ],
    level: "Level_01",
  },
  {
    title: "Cmajor_003",
    notes: [
      { midiNumber: 60, time: 0, duration: 0.5 },
      { midiNumber: 64, time: 0.5, duration: 0.5 },
      { midiNumber: 67, time: 1.0, duration: 0.5 },
      { midiNumber: 69, time: 1.5, duration: 0.5 },
      { midiNumber: 67, time: 2.0, duration: 0.5 },
      { midiNumber: 64, time: 2.5, duration: 0.5 },
      { midiNumber: 62, time: 3.0, duration: 0.5 },
      { midiNumber: 64, time: 3.5, duration: 0.5 },
      { midiNumber: 60, time: 4.0, duration: 2.0 },
    ],
    level: "Level_01",
  },
  {
    title: "Cmajor_004",
    notes: [
      { midiNumber: 60, time: 0, duration: 0.5 },
      { midiNumber: 64, time: 0.5, duration: 0.5 },
      { midiNumber: 67, time: 1.0, duration: 0.5 },
      { midiNumber: 72, time: 1.5, duration: 0.5 },
      { midiNumber: 71, time: 2.0, duration: 0.5 },
      { midiNumber: 67, time: 2.5, duration: 0.5 },
      { midiNumber: 65, time: 3.0, duration: 0.5 },
      { midiNumber: 62, time: 3.5, duration: 0.5 },
      { midiNumber: 60, time: 4.0, duration: 2.0 },
    ],
    level: "Level_01",
  },
  {
    title: "Dmajor_005",
    notes: [
      { midiNumber: 62, time: 0, duration: 0.5 },
      { midiNumber: 64, time: 0.5, duration: 0.5 },
      { midiNumber: 66, time: 1.0, duration: 0.5 },
      { midiNumber: 67, time: 1.5, duration: 0.5 },
      { midiNumber: 69, time: 2.0, duration: 0.5 },
      { midiNumber: 67, time: 2.5, duration: 0.5 },
      { midiNumber: 66, time: 3.0, duration: 0.5 },
      { midiNumber: 64, time: 3.5, duration: 0.5 },
      { midiNumber: 62, time: 4.0, duration: 2.0 },
    ],
    level: "Level_01",
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
