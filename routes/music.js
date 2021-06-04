const router = require("express").Router();
const Track = require("../models/Tracks.model");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/", (req, res) => {
  Track.find()
    .then((foundTracks) => {
      res.render("music", { user: req.session.user?._id, track: foundTracks });
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post("/", isLoggedIn, (req, res) => {
  const { track } = req.body;
  Track.create({
    track: track,
  })
    .then((newTrack) => {
      console.log(newTrack);
      res.redirect("/music");
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
