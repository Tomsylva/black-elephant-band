const { Schema, model } = require("mongoose");

const videosSchema = new Schema({
  url: {
      type: String,
  }
});

const Videos = model("Videos", videosSchema);

module.exports = Videos;