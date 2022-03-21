const router = require("express").Router();
const { Hero, Item } = require("../models");
const randomEntry = require("../utils/randomEntry");

router.get("/", async (req, res) => {
  try {
    const heroData = await Hero.findAll();
    const itemData = await Item.findAll();

    const heroesArray = heroData.map((heroes) => heroes.get({ plain: true }));
    const itemsArray = itemData.map((items) => items.get({ plain: true }));

    const randomHero = randomEntry(heroesArray);

    const inventory = [];

    for (var i = 0; i < 6; i++) {
      inventory.push(randomEntry(itemsArray));
    }

    res.render("homepage", { ...randomHero, inventory });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/test-items", async (req, res) => {
  try {
    const itemData = await Item.findAll();

    const itemsArray = itemData.map((items) => items.get({ plain: true }));

    res.render("test-items", { itemsArray });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
