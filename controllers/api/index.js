const router = require("express").Router();

const seedRoutes = require("./seed");

router.use("/seed", seedRoutes);

module.exports = router;
