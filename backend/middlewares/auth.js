const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(403).send({ message: `Auth is required ${authorization} and ${req.headers}` });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'test-string');
  } catch (err) {
    return res.status(401).send({ message: 'A problem with the token ocurred' });
  }
  req.user = payload;
  return next();
};
