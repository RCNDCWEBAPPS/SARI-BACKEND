module.exports =(sequelize, dataTypes)=> {
    const category = sequelize.define("category", {
      id: {
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name:{
          type:dataTypes.STRING,
          allowNull:false,
      },
      description : {
        type: dataTypes.STRING,
        allowNull: false,
      },
    });
    return category
  }