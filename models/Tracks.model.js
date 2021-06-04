const { Schema, model } = require("mongoose");

const trackSchema = new Schema({
  track: {
    type: String,
  },
});

const Track = model("Track", trackSchema);

module.exports = Track;
