const bcrypt = require('bcrypt');
const { Router } = require('express');
const User = require('../persistence/users');
const { generateAccessToken } = require('../utils');

const router = new Router();

router.post('/token', async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({ message: 'email and password must be provided' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user)
      return response.status(401).json({
        message: 'User not found',
      });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return response.status(401).json({
        message: 'Invalid username/password',
      });

    const token = generateAccessToken({ user: email });

    return response.status(200).json({ token });
  } catch (error) {
    console.error(`createUser({ email: ${request.body.email} }) >> Error: ${error.stack}`);
    response.status(500).json();
  }
});

module.exports = router;
