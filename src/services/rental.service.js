const { Rental, User, Book } = require('../models');
const serviceReturn = require('../utils/mountServiceReturn');

const getAll = async (loggedUser) => {
  const user = await User.findOne({ where: loggedUser });
  if (!user) return serviceReturn(400, 'Something is wrong');
  if (loggedUser.role !== 1) return serviceReturn(403, "You can't access this page");
  const borrows = await Rental.findAll(
    {
      attributes: { exclude: ['userId', 'bookId']},
      include: [
        { model: User, as: 'user', attributes: ['username'] },
        { model: Book, as: 'book', attributes: ['title'] }
      ]
    }
  );
  return serviceReturn(200, borrows);
};

module.exports = { getAll }
