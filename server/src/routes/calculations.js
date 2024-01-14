const express = require('express');
const router = express.Router();

/* Add Calculation */
function addCalculation({ res, calculation, result }) {
  const db = require('../database-config');

  const query = `INSERT INTO calculations (calculation, result, created_at, updated_at) VALUES (?, ?, NOW(), NOW())`;

  db.query(query, [calculation, result], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error saving calculation');
    } else {
      const insertedId = results.insertId;
      console.log(`Inserted calculation with id ${insertedId}`);

      db.query(`SELECT * FROM calculations WHERE id = ?`, [insertedId], (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error retrieving calculation');
        } else {
          const savedCalculation = results[0];
          res.status(200).json(savedCalculation);
        }
      });
    }
  });
}

router.post('/add', (req, res) => {
  console.log('add calculation');
  console.log(req.body);

  const { calculation, result } = req.body;

  addCalculation({ res, calculation, result });
});

/* Get Calculations */
router.get('/getCalculations', (req, res) => {
  console.log('get calculations');

  const db = require('../database-config');

  db.query(`SELECT * FROM calculations`, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error retrieving calculations');
    } else {
      const calculations = results;
      res.status(200).json(calculations);
    }
  });
});

/* Delete Calculation */
router.delete('/:id', (req, res) => {
  console.log('delete calculation');
  console.log(req.params);

  const db = require('../database-config');

  const query = `DELETE FROM calculations WHERE id = ?`;

  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error deleting calculation');
    } else {
      res.status(200).send('Calculation deleted');
    }
  });
});

/* Delete All Calculations */
router.delete('/', (req, res) => {
  console.log('delete all calculations');

  const db = require('../database-config');

  const query = `DELETE FROM calculations`;

  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error deleting all calculations');
    } else {
      res.status(200).send('All calculations deleted');
    }
  });
});


module.exports = router;
