const { Schema, model } = require("mongoose");

const postsSchema = new Schema({
  title: {
    type: String,
  },
  text: {
      type: String,
  },
  image: {
      type: String,
  }
});

const Posts = model("Posts", postsSchema);

module.exports = Posts;