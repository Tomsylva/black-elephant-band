const router = require ("express").Router();

router.get("/", (req, res) => {
    res.render("friends");
  });

module.exports = router;