const { Schema, model } = require("mongoose");

const trackSchema = new Schema({
  track: {
    type: String,
  },
  artist: {
      type: String,
      defeault: "The Black Elephant Band"
  },
  album: {
      type: String,
  },
  image: {
    type: String,
  },
});

const Track = model("Track", trackSchema);

module.exports = Track;