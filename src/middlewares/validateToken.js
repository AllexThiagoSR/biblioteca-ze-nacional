const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  const secretKey = process.env.JWT_SECRET;
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const data = jwt.verify(token, secretKey);
    req.user = data.user;
    if (data.user.role !== 1) return res.status(403).json({ message: "You can't access this page" });
    return next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = validateToken;
