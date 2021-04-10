const { Schema, model } = require("mongoose");

const concertSchema = new Schema({
  name: {
    type: String,
  },
  location: {
      type: String,
  },
  time: {
      type: Date,
  },
  image: {
      type: String,
  },
  link: {
      type: String,
  },
});

const Concert = model("Concert", concertSchema);

module.exports = Concert;