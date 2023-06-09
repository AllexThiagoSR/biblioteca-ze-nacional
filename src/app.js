const express = require('express');
const { bookRouter, userRouter } = require('./router');
const validateToken = require('./middlewares/validateToken');
const { rentalService } = require('./services');

const app = express();

app.use(express.json());

app.use('/books', bookRouter);

app.use('/users', userRouter);

app.get('/admin/show/borrows', validateToken, async (req, res) => {
  const { status, data } = await rentalService.getAll(req.user)
  return res.status(status).json(data);
})

module.exports = app;