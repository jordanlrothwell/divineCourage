const router = require("express").Router();

const seedRoutes = require("./seedRoutes");

router.use("/seeds", seedRoutes);

module.exports = router;
