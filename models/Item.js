const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Item extends Model {}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    item_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeCreate: async (item) => {
        const nameWithSpace = item.name;
        const nameWithHyphen = nameWithSpace.replace(/ /g, "-");
        const nameWithUnderscore = nameWithSpace.replace(/ /g, "_");
        const nameForURL = nameWithHyphen.replace(/'/g, "");
        let nameForTag = nameWithUnderscore.replace(/'/g, "");

        item.item_image = `https://www.dotafire.com/images/item/${nameForURL}.png`;
        if (!item.tag) {
          item.tag = `${nameForTag.toLowerCase()}`;
        }
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "item",
  }
);

module.exports = Item;
