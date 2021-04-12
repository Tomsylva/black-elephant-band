const router = require ("express").Router();

router.get("/", (req, res) => {
    res.render("merch");
  });

module.exports = router;