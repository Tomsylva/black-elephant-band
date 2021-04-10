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
      tspe: String,
  },
  tracks: [{
      type: Schema.Types.ObjectId, ref: "Track"
  }]
});

const Artist = model("Artist", artistSchema);

module.exports = Artist;