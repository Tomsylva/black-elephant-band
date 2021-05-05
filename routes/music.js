const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("music", { user: req.session.user?._id });
});

module.exports = router;
