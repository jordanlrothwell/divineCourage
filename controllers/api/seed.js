const router = require("express").Router();
const { Hero, Item } = require("../../models");

router.post("/heroes", async (req, res) => {
  try {
    const heroData = await Hero.bulkCreate({... req.body}, {
      individualHooks: true,
      returning: true,
    });
    res.status(200).json(heroData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/items", async (req, res) => {
  try {
    const itemData = await Item.bulkCreate(req.body, {
      individualHooks: true,
      returning: true,
    });
    res.status(200).json(itemData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
