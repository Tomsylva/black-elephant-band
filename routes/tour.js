const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("tours", { user: req.session.user?._id });
});

module.exports = router;
