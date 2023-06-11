const Sequelize = require('sequelize');
const config = require('../config/config');
const { User } = require('../models');
const serviceReturn = require('../utils/mountServiceReturn');
const jwt = require('jsonwebtoken');

const env = process.env.NOODE_ENV || 'development';
const seq = new Sequelize(config[env]);

const create = async (username, password) => {
  const transaction = await seq.transaction();
  try {
    const user = await User.create({ username, password }, { transaction });
    await transaction.commit();
    return serviceReturn(200, { id: user.id, username: user.username });
  } catch (error) {
    await transaction.rollback();
    console.log(error.original.code);
    if (error.original.code === 'ER_DUP_ENTRY') return serviceReturn(409, 'This username is already in use')
    return serviceReturn(500, 'Internal server error');
  }
};

const login = async (username, password) => {
  const secretKey = process.env.JWT_SECRET;
  const jwtConfig = { expiresIn: '2d', algorithm: 'HS256' };
  try {
    const user = await User.findOne({ where: { username } });
    if (!user || user.password !== password) return serviceReturn(401, 'Incorrect username or password ');
    const token = jwt.sign(
      { user: { username, id: user.id, role: user.role } },
      secretKey,
      jwtConfig,
    );
    return serviceReturn(200, { token });
  } catch (error) {
    return serviceReturn(500, 'Internal server error');
  }
};

module.exports = { create, login };
