module.exports = (sequelize, DataTypes) => {
  const Rental = sequelize.define(
    'Rental',
    {
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
