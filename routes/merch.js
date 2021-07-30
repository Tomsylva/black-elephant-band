const router = require("express").Router();

router.get("/", (req, res) => {
  res.redirect("https://theblackelephantband.bandcamp.com/merch");
});

module.exports = router;
