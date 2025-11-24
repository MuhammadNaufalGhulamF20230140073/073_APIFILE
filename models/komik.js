module.exports = (sequelize, DataTypes) => {
  const Komik = sequelize.define(
    "Komik",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      author: {
        type: DataTypes.STRING,
      },
      imagetype: DataTypes.STRING,
      imagename: DataTypes.STRING,
      ImageData: DataTypes.BLOB("long"),
    },
    {
      tableName: "komik",
    }
  );
  return Komik;
};
