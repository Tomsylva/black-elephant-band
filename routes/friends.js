const router = require ("express").Router();
const Artist = require("../models/Artist.model")
const isLoggedIn = require("../middlewares/isLoggedIn")

router.get("/", (req, res) => {
    Artist.find().then((foundArtists) => {
      res.render("friends", {user: req.session.user?._id, friend: foundArtists});
    }).catch((err) => {
      res.render("friends");
      console.log(err)
    })
  });

router.post("/", isLoggedIn, (req, res) => {
  const {artistName, artistDescription, artistLink} = req.body;
  Artist.create({
    name: artistName,
    description: artistDescription,
    link: artistLink,
  })
  .then((newArtist) => {
    res.redirect("/friends")
  }).catch((err) => {
    console.log(err);
    res.redirect("/")
  })
})

router.get("/:artistName/delete", isLoggedIn, (req, res) => {
  Artist.findOneAndDelete({name: req.params.artistName}).then(() => {
    res.redirect("/friends")
  }).catch((err) => {
    console.log(err);
    res.redirect("/friends")
  })
})

module.exports = router;