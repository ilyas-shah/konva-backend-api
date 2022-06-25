const { Router } = require('express');
const Drawing = require('../persistence/drawings');
const bcrypt = require('bcrypt');

const router = new Router();

router.post('/', async (request, response) => {
  try {
    const result = await Drawing.create({ ...request.body, user: request.user });

    return response.status(201).json({
      id: result?.id,
      message: 'Drawing saved.',
    });
  } catch (error) {
    console.error(`createUser({ drawing: ${request.body} }) >> Error: ${error.stack}`);
    response.status(500).json();
  }
});

router.get('/', async (request, response) => {
  let query = {
    user: request.user,
  };

  try {
    const result = await Drawing.findAll({ where: { ...query }, attributes: ['annotations', 'id'] });

    return response.status(200).json({
      drawings: result,
      message: 'Success.',
    });
  } catch (error) {
    console.error(`createUser({ drawing: ${request.body} }) >> Error: ${error.stack}`);
    response.status(500).json();
  }
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;
  const query = {
    id,
    user: request.user,
  };

  try {
    const result = await Drawing.findOne({ where: { ...query }, attributes: ['annotations', 'id'] });

    if (!result)
      return response.status(404).json({
        message: 'Not found.',
      });

    return response.status(200).json({
      drawing: result,
      message: 'Success.',
    });
  } catch (error) {
    console.error(`createUser({ drawing: ${request.body} }) >> Error: ${error.stack}`);
    response.status(500).json();
  }
});

router.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const query = {
    id,
    user: request.user,
  };

  try {
    const result = await Drawing.findOne({ where: { ...query }, attributes: ['annotations', 'id'] });

    if (!result)
      return response.status(404).json({
        message: 'Not found.',
      });

    // in real case, do a soft delete
    await Drawing.destroy({
      where: { id },
    });
    return response.status(204).send();
  } catch (error) {
    console.error(`createUser({ drawing: ${request.body} }) >> Error: ${error.stack}`);
    response.status(500).json();
  }
});

module.exports = router;
