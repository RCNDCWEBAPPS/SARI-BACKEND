const { STRING } = require("sequelize");
module.exports =(sequelize, dataTypes)=> {
    const salesproduct = sequelize.define("salesproduct", {
      id: {
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      quantity: {
        type: dataTypes.INTEGER,
    
      },
      comment: {
        type: dataTypes.STRING(1000),
      },
    });
      salesproduct.associate = (models) => {
        salesproduct.belongsTo(models.products, {
          foreignKey: {
            name: "productId",
            allowNull: false,
          },
          onDelete: "cascade",
        });
      };

   return salesproduct
    }