const { Schema, model } = require("mongoose");

const artistSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  link: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Artist = model("Artist", artistSchema);

module.exports = Artist;
