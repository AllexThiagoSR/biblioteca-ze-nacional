const Sequelize = require('sequelize');
const config = require('../config/config');
const { Book, User, Rental } = require('../models');
const todayDate = require('../utils/getDate');

const env = process.env.NOODE_ENV || 'development';

const seq = new Sequelize(config[env]);

const getAll = async () => {
  try {
    const books = await Book.findAll();
    return { status: 200, data: { total: books.length, books } };
  } catch (error) {
    return { status: 500, data: { message: 'Internal server error' } };
  }
};

const getById = async (id) => {
  try {
    const book = await Book.findByPk(id);
    if (!book) return { status: 404, data: { message: 'Book not found' } };
    return { status: 200, data: book };
  } catch (error) {
    console.log(error.message);
    return { status: 500, data: { message: 'Internal server error' } };
  }
};

const borrow = async (bookId, userId) => {
  const transaction = await seq.transaction();
  try {
    const book = await Book.findByPk(bookId);
    if (!book) return { status: 404, data: { message: `Not found: Book with the id ${bookId}` } };
    if (book.isRented) {
      return { status: 409, data: { message: `Book with id ${bookId} is already borrowed` } };
    }
    const user = await User.findByPk(userId);
    if (!user) return { status: 404, data: { message: `Not found: User with the id ${userId}` } };
    await Book.update({ isRented: true }, { where: { id: bookId } });
    const date = todayDate();
    await Rental.create({ bookId, userId, rentalDate: date });
    await transaction.commit();
    return {
      status: 200,
      data: {
        message: `Book with id ${bookId} borrowed by userId ${userId} at ${date}`
      },
    }; 
  } catch (error) {
    await transaction.rollback();
    return { status: 500, data: { message: 'Internal server error' } };
  }
};

module.exports = { getAll, getById, borrow };
