const itemIDs = require("../data/item_ids.json");
const items = require("../data/items.json");
const { Item } = require("../models");

const apiIDtoPK = async function (apiID) {
  const tag = itemIDs[apiID];
  const matchingItem = await Item.findOne({
    where: {
      tag: tag,
    },
  });
  return matchingItem.id;
};

module.exports = apiIDtoPK;
