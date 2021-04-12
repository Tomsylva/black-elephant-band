const router = require ("express").Router();

router.get("/", (req, res) => {
    res.render("tours");
  });

module.exports = router;