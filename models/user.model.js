
module.exports = (sequelize, dataTypes) => {
  const user = sequelize.define("user", {
    id: {
      type: dataTypes.UUID,
      defaultValue: dataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
 addBy:{
   type:dataTypes.UUID,
   defaultValue:""
 },
    firstName: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING,
      unique: true,
    },
    phoneNo: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    location:{
type:dataTypes.STRING
    },
    username: {
      type: dataTypes.STRING,
    
      defaultValue:""
    },
    sex: {
      allowNull: false,
      type: dataTypes.STRING,
      defaultValue: "male",
      value: ["male", "female"],
    },

    activate: {
      type: dataTypes.BOOLEAN,
      defaultValue: false,
    },
    code: {
      type: dataTypes.INTEGER,
    },
    password: {
      type: dataTypes.STRING,
      defaultValue:""
 
    },
    pass: {
      type: dataTypes.STRING,
      defaultValue:""
 
    },
    profilePicture: {
      type: dataTypes.STRING,
    },
    role: {
      allowNull: false,
      type: dataTypes.STRING,
      defaultValue: "user",
      value: ["truck_driver", "farmers","ranchManager", "inspector", "user"],
    },
  });
  return user;
};
