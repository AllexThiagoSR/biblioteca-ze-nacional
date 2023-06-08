const Sequelize = require('sequelize');
const config = require('../config/config');
const { User } = require('../models');
const serviceReturn = require('../utils/mountServiceReturn');

const env = process.env.NOODE_ENV || 'development';

const seq = new Sequelize(config[env]);

const create = async (username, password) => {
  const transaction = await seq.transaction();
  try {
    const user = await User.create({ username, password }, { transaction });
    await transaction.commit();
    return serviceReturn(200, user);
  } catch (error) {
    await transaction.rollback();
    console.log(error.original.code);
    if (error.original.code === 'ER_DUP_ENTRY') return serviceReturn(409, 'This username is already in use')
    return serviceReturn(500, 'Internal server error');
  }
};

module.exports = { create };
