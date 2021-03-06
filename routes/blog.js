const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const Posts = require("../models/Posts.model");
const tinyApi = process.env.TINY_API;

router.get("/", (req, res) => {
  Posts.find()
    .sort({ date: -1 })
    .then((foundBlogs) => {
      res.render("blog", {
        user: req.session.user?._id,
        blogs: foundBlogs,
        tinyApi: tinyApi,
      });
    })
    .catch((err) => {
      res.render("blog");
      console.log(err);
    });
});

router.post("/", isLoggedIn, (req, res) => {
  const { title, text } = req.body;
  Posts.create({
    title,
    text,
  })
    .then(() => {
      res.redirect("/blog");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/blog");
    });
});

router.get("/edit/:postId", isLoggedIn, (req, res) => {
  Posts.findOne({ _id: req.params.postId })
    .then((foundPost) => {
      res.render("edit-blog", {
        blog: foundPost,
        user: req.session.user?._id,
        tinyApi: tinyApi,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/blog");
    });
});

router.post("/edit/:postId/edit", isLoggedIn, (req, res) => {
  const postId = req.params.postId;
  const { title, text } = req.body;
  Posts.findByIdAndUpdate(
    postId,
    { $set: { title: title, text: text } },
    { new: true }
  )
    .then(() => {
      return res.redirect("/blog");
    })
    .catch((err) => {
      console.log(err);
      return res.redirect("/blog");
    });
});

router.get("/delete/:postId", isLoggedIn, (req, res) => {
  Posts.findOneAndDelete({ _id: req.params.postId })
    .then(() => {
      res.redirect("/blog");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/blog");
    });
});

module.exports = router;
