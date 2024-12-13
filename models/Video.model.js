const { Schema, model } = require("mongoose");

const videosSchema = new Schema({
  url: {
    type: String,
    order: Number,
  },
});

const Videos = model("Videos", videosSchema);

module.exports = Videos;
