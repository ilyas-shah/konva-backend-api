const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'secret', (err, user) => {
    console.log(err);

    if (err)
      return res.status(403).json({
        message: 'Invalid access token',
      });

    req.user = user.user;

    next();
  });
}

module.exports = {
  authenticateToken,
};
