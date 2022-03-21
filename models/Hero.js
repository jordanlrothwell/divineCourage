const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Hero extends Model {}

Hero.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_API: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    localized_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    primary_attr: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    attack_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hero_image: {
      type: DataTypes.STRING,
    },
  },
  {
    hooks: {
      beforeCreate: async (hero) => {
        let nameWithSpace = hero.localized_name;
        if (nameWithSpace == "Io") {
          nameWithSpace = "wisp";
        }
        if (nameWithSpace == "Nature's Prophet") {
          nameWithSpace = "natures prophet";
        }
        if (nameWithSpace == "Centaur Warrunner") {
          nameWithSpace = "centaur warchief";
        }
        const nameWithHyphen = nameWithSpace.replace(/ /g, "-");
        hero.hero_image = `https://www.dotafire.com/images/hero/icon/${nameWithHyphen}.png`;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "hero",
  }
);

module.exports = Hero;
