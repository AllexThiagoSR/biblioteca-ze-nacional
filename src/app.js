const express = require('express');
const { bookRouter, userRouter } = require('./router');
const validateToken = require('./middlewares/validateToken');

const app = express();

app.use(express.json());

app.use('/books', bookRouter);

app.use('/users', userRouter);

app.get('/admin/show/borrows', validateToken,async (req, res) => {
  return res.status(200).json({ user: req.user });
})

module.exports = app;