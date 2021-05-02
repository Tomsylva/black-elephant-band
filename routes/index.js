const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/impressum", (req, res) => {
  res.render("impressum");
});

module.exports = router;
