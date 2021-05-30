const router = require("express").Router();

router.get("/", (req, res) => {
  res.redirect(
    "https://theblackelephantband.bandcamp.com/merch" /*{, user: req.session.user?._id }*/
  );
});

module.exports = router;
