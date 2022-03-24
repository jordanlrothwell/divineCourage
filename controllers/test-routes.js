const router = require("express").Router();
const { Hero, Item } = require("../models");
const randomEntry = require("../utils/randomEntry");
const getPopularItems = require("../utils/getPopularItems");
const arrayByFrequency = require("../utils/arrayByFrequency");

router.get("/", async (req, res) => {
  try {
    const heroData = await Hero.findAll();
    const itemData = await Item.findAll();

    const heroesArray = heroData.map((heroes) => heroes.get({ plain: true }));
    const itemsArray = itemData.map((items) => items.get({ plain: true }));

    const randomHero = randomEntry(heroesArray);
    const id_API = randomHero.id_API;

    const popularItems = await getPopularItems(id_API);

    const midGameByFrequency = arrayByFrequency(popularItems.midGame);
    

    res.status(200).json({ randomHero, popularItems, midGameByFrequency, itemsArray });
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
