const express = require('express');
const router = express.Router();

const calculationsRoutes = require('./calculations');

router.use('/', calculationsRoutes);

router.get('/', (req, res) => {
  res.send('Server is up and running');
});

module.exports = router;
