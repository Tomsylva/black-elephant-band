const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const Artist = require("../models/Artist.model");
const parser = require("../config/cloudinary");
const cloudinary = require("cloudinary");

router.get("/", (req, res) => {
  Artist.find()
    .then((foundArtists) => {
      res.render("friends", {
        user: req.session.user?._id,
        friend: foundArtists,
      });
    })
    .catch((err) => {
      res.render("friends");
      console.error(err);
    });
});

router.post("/", isLoggedIn, parser.single("image"), (req, res) => {
  const { artistName, artistDescription, artistLink } = req.body;
  const picture = req.file.path;
  Artist.create({
    name: artistName,
    description: artistDescription,
    link: artistLink,
    image: picture,
  })
    .then((newArtist) => {
      res.redirect("/friends");
    })
    .catch((err) => {
      console.error(err);
      res.redirect("/");
    });
});

router.get("/edit/:artistName", isLoggedIn, (req, res) => {
  Artist.findOne({ name: req.params.artistName })
    .then((foundArtist) => {
      res.render("edit-friends", {
        artist: foundArtist,
        user: req.session.user?._id,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/friends");
    });
});

router.post("/edit/:artistName", isLoggedIn, (req, res) => {
  const artistName = req.params.artistName;
  const { name, description, link } = req.body;
  Artist.findOneAndUpdate(
    { name: artistName },
    { $set: { name: name, description: description, link: link } },
    { new: true }
  )
    .then((updatedArtist) => {
      return res.redirect("/friends");
    })
    .catch((err) => {
      console.error(err);
      return res.redirect("/friends");
    });
});

router.get("/delete/:artistName", isLoggedIn, (req, res) => {
  Artist.findOneAndDelete({ name: req.params.artistName })
    .then(() => {
      res.redirect("/friends");
    })
    .catch((err) => {
      console.error(err);
      res.redirect("/friends");
    });
});

module.exports = router;
