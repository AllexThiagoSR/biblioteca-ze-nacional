module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'Book',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      title: DataTypes.STRING,
      isRented: DataTypes.BOOLEAN,
    },
    {
      underscored: true,
      tableName: 'books',
      timestamps: false,
    },
  );
  return Book;
};
