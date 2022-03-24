const router = require("express").Router();
const { Hero, Item } = require("../models");
const randomEntry = require("../utils/randomEntry");
const getPopularItems = require("../utils/getPopularItems");
const arrayByFrequency = require("../utils/arrayByFrequency");
const apiIDtoPK = require("../utils/apiIDtoPK");

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
    const lateGameByFrequency = arrayByFrequency(popularItems.lateGame);

    const getWeightedPK = async function (stageOfGame) {
      const weightedPK = await apiIDtoPK(randomEntry(stageOfGame));
      return weightedPK
    } 

    //TODO: fix edge case where limited item choices result in an endless loop

    const midGameChoices = [];

    while (midGameChoices.length < 2) {
        let randomMidGameItem = await getWeightedPK(midGameByFrequency);
        if(!midGameChoices.includes(randomMidGameItem)) {
            midGameChoices.push(randomMidGameItem)
        }
    }

    const lateGameChoices = [];

    while (lateGameChoices.length < 3) {
        let randomLateGameItem = await getWeightedPK(lateGameByFrequency);
        if(!lateGameChoices.includes(randomLateGameItem) && !midGameChoices.includes(randomLateGameItem)) {
            lateGameChoices.push(randomLateGameItem)
        }
    }

    res.status(200).json({
        midGameChoices,
      lateGameChoices,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
