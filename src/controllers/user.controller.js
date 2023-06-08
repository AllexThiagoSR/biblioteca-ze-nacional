const { userService } = require("../services");

const create = async (req, res) => {
  const { username, password } = req.body;
  const { status, data } = await userService.create(username, password);
  return res.status(status).json(data);
};

module.exports = { create };
