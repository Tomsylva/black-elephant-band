const { Schema, model } = require("mongoose");
// const marked = require("marked");
// const createDomPurify = require("dompurify");
// const { JSDOM } = require("jsdom");
// const dompurify = createDomPurify(new JSDOM().window);

const postsSchema = new Schema({
  title: {
    type: String,
  },
  text: {
    type: String,
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  // sanitizedHtml: {
  //   type: String,
  //   required: true,
  // },
});

// postsSchema.pre("validate", function (next) {
//   if (this.text) {
//     this.sanitizedHtml = dompurify.sanitize(marked(this.text));
//   }
//   next();
// });

const Posts = model("Posts", postsSchema);

module.exports = Posts;
