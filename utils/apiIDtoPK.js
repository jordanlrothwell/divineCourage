const itemIDs = require("../data/item_ids.json");
const { Item } = require("../models");

const apiIDtoPK = async function (apiID) {
  const tag = itemIDs[apiID];
  const matchingItem = await Item.findOne({
    where: {
      tag: tag,
    },
  });
  return matchingItem;
};

module.exports = apiIDtoPK;
