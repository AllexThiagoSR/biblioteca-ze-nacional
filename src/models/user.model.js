'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.INTEGER,
    },
    {
      underscored: true,
      tableName: 'users',
      timestamps: false,
    },
  );

  User.associate = ({ Rental }) => {
    User.hasMany(Rental, { foreignKey: 'userId', as: 'rentals' });
  };

  return User;
};
