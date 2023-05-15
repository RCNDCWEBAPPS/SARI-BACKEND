const { STRING } = require("sequelize");

module.exports =(sequelize, dataTypes)=> {
  const products = sequelize.define("products", {
    id: {
      type: dataTypes.UUID,
      defaultValue: dataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    frameMaterieal: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    categoryName: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    modelNo: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  });
  products.associate = (models) => {
    products.hasMany(models.ProductImage, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onDelete: "cascade",
    });
      products.hasMany(models.salesproduct, {
        foreignKey: {
          name: "productId",
          allowNull: false,
        },
        onDelete: "cascade",
      });
  };
  //products

  return products;
}