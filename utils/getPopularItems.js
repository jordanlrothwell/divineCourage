const fetch = require("node-fetch");

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

module.exports = getPopularItems;
