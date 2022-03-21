const router = require("express").Router();
const { Hero, Item } = require("../../models");

router.post("/seed-heroes", async (req, res) => {
  try {
    const heroData = await Hero.bulkCreate({
      ...req.body,
    });
    res.status(200).json(heroData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/seed-items", async (req, res) => {
  try {
    const itemData = await Item.bulkCreate({
      ...req.body,
    });
    res.status(200).json(itemData);
  } catch (error) {
    res.status(500).json(error);
  }
});
