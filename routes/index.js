const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("index", { user: req.session.user?._id });
});

router.get("/impressum", (req, res) => {
  res.render("impressum");
});

module.exports = router;
