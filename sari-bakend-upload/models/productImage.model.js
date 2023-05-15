
module.exports=(sequelize,dataTypes)=>{
    const ProductImage = sequelize.define("ProductImage", {
      Id: {
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
        primaryKey: true,
      },
      imageURI: {
        type: dataTypes.STRING,
      },
      
    });
    ProductImage.associate = (models) => {
      ProductImage.belongsTo(models.products, {
        foreignKey: {
          name: "productId",
          allowNull: false,
        },
        onDelete: "cascade",
      });
    };
    return ProductImage;
}

