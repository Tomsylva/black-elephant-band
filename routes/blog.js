const router = require ("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const Posts = require("../models/Posts.model");

router.get("/", (req, res) => {
    Posts.find().then((foundBlogs => {
      res.render("blog", {user: req.session.user?._id, blogs: foundBlogs,})
    })).catch((err) => {
      res.render("blog");
      console.log(err)
    })
  });

  router.post("/", isLoggedIn, (req, res) => {
    const {title, text} = req.body;
    Posts.create({
      title,
      text,
    })
      .then((newBlog) => {
      res.redirect("/")
    }).catch((err) => {
      console.log(err);
      res.redirect("/")
    })
  })

module.exports = router;