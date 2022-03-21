const sequelize = require("../config/connection");
const { Hero, Item } = require("../models");

const heroData = require("./heroes.json");
const itemData = require("./items.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  
  await Hero.bulkCreate(heroData, {
    individualHooks: true,
    returning: true,
  });

  await Item.bulkCreate(itemData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
