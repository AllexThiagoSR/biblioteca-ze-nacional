const { userService } = require("../services");

const create = async (req, res) => {
  const { username, password } = req.body;
  const { status, data } = await userService.create(username, password);
  return res.status(status).json(data);
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const { status, data } = await userService.login(username, password);
  return res.status(status).json(data);
};

module.exports = { create, login };
