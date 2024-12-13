const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const Videos = require("../models/Video.model");

router.get("/", (req, res) => {
  Videos.find()
    .sort({ order: 1 })
    .then((videos) => {
      res.render("videos", {
        user: req.session.user?._id,
        videos: videos,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/", isLoggedIn, (req, res) => {
  const videoLink = req.body.videoLink;
  Videos.create({
    url: videoLink,
  })
    .then(() => {
      res.redirect("/videos");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/vidoes");
    });
});

router.get("/delete/:videoUrl", isLoggedIn, (req, res) => {
  console.log("REQ PARAMS", req.params);
  Videos.findOneAndDelete({ url: req.params.videoUrl })
    .then(() => {
      res.redirect("/videos");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/videos");
    });
});

module.exports = router;
