const router = require("express").Router();
const { Hero } = require("../models");
const heroesDataARR = require("../data/heroes.json");
const itemIDs = require("../data/item_ids.json");
const fetch = require("node-fetch");
const { findAll } = require("../models/Hero");

const getPopularItems = async function (index) {
  const itemPopularityJSON = await fetch(
    `https://api.opendota.com/api/heroes/${index}/itemPopularity`
  );

  const itemPopularityOBJ = await itemPopularityJSON.json();

  const startGame = itemPopularityOBJ.start_game_items;
  const earlyGame = itemPopularityOBJ.early_game_items;
  const midGame = itemPopularityOBJ.mid_game_items;
  const lateGame = itemPopularityOBJ.late_game_items;

  const popularItemsObj = { startGame, earlyGame, midGame, lateGame };

  return popularItemsObj;
};

const findHeroID = function (name) {
  const heroOBJ = heroesDataARR.find((heroOBJ) => {
    if (heroOBJ.localized_name == name) {
      return true;
    }
  });

  return heroOBJ.id_API;
};

module.exports = getPopularItems;