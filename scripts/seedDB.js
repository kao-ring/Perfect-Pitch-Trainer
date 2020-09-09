const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/perfectpitch");

const songSeed = [
  {
    songTitle: "Cmajor_001",
    notes: [
      { midiNumber: 60, time: 0, duration: 0.3 },
      { midiNumber: 62, time: 0.3, duration: 0.3 },
      { midiNumber: 60, time: 0.6, duration: 0.3 },
      { midiNumber: 62, time: 0.9, duration: 0.3 },
      { midiNumber: 64, time: 1.2, duration: 0.3 },
      { midiNumber: 62, time: 1.5, duration: 0.3 },
      { midiNumber: 64, time: 1.8, duration: 0.3 },
      { midiNumber: 62, time: 2.1, duration: 0.3 },
      { midiNumber: 60, time: 2.4, duration: 0.3 },
    ],
    level: "Level_01",
  },
  {
    songTitle: "Cmajor_002",
    notes: [
      { midiNumber: 60, time: 0, duration: 0.3 },
      { midiNumber: 62, time: 0.3, duration: 0.3 },
      { midiNumber: 64, time: 0.6, duration: 0.3 },
      { midiNumber: 62, time: 0.9, duration: 0.3 },
      { midiNumber: 60, time: 1.2, duration: 0.3 },
      { midiNumber: 62, time: 1.5, duration: 0.3 },
      { midiNumber: 64, time: 1.8, duration: 0.3 },
      { midiNumber: 62, time: 2.1, duration: 0.3 },
      { midiNumber: 60, time: 2.4, duration: 0.3 },
    ],
    level: "Level_01",
  },
  {
    songTitle: "Cmajor_003",
    notes: [
      { midiNumber: 60, time: 0, duration: 0.3 },
      { midiNumber: 62, time: 0.3, duration: 0.3 },
      { midiNumber: 64, time: 0.6, duration: 0.3 },
      { midiNumber: 65, time: 0.9, duration: 0.3 },
      { midiNumber: 67, time: 1.2, duration: 0.3 },
      { midiNumber: 65, time: 1.5, duration: 0.3 },
      { midiNumber: 64, time: 1.8, duration: 0.3 },
      { midiNumber: 62, time: 2.1, duration: 0.3 },
      { midiNumber: 60, time: 2.4, duration: 0.3 },
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
