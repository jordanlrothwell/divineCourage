const router = require("express").Router();

const seedRoutes = require("./seedRoutes");

router.use("/seed", seedRoutes);

module.exports = router;
