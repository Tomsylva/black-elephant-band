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

const Post = model("Post", postSchema);

module.exports = Post;