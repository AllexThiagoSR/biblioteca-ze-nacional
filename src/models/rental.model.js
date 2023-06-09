'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rental = sequelize.define(
    'Rental',
    {
      userId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      bookId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      rentalDate: DataTypes.DATE,
      returnedAt: DataTypes.DATE,
    },
    {
      underscored: true,
      tableName: 'rentals',
      timestamps: false,
    },
  );

  Rental.associate = ({ User, Book }) => {
    Rental.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Rental.belongsTo(Book, {
      foreignKey: 'bookId',
      as: 'book',
    });

    User.belongsToMany(
      Book,
      {
        foreignKey: 'userId',
        otherKey: 'bookId',
        as: 'users',
        through: Rental,
      }
    );
    Book.belongsToMany(
      User,
      {
        foreignKey: 'bookId',
        otherKey: 'userId',
        as: 'books',
        through: Rental,
      },
    );
  };

  return Rental;
};
