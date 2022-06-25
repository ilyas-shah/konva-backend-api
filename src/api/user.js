const { Router } = require('express');
const User = require('../persistence/users');
const bcrypt = require('bcrypt');

const router = new Router();

router.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).json({ message: 'email and password must be provided' });
    }
    const user = await User.findOne({ where: { email } });

    if (user) {
      return response.status(400).json({ message: 'User already exists' });
    }

    const result = await User.create({ email, password });

    return response.status(201).json({
      id: result?.id,
      message: 'user created.',
    });
  } catch (error) {
    console.error(`createUser({ email: ${request.body.email} }) >> Error: ${error.stack}`);
    response.status(500).json();
  }
});

module.exports = router;
