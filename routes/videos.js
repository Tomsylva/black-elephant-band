const router = require ("express").Router();

router.get("/", (req, res) => {
    res.render("videos");
  });

module.exports = router;