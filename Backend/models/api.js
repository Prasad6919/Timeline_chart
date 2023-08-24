// api.js
const express = require('express');
const router = express.Router();
const DataModel = require('../models/mongoose'); // Path might vary based on your directory structure

// GET route to fetch data
router.get('/data', async (req, res) => {
  try {
    const data = await DataModel.find({"data.io.di1":{"$exists" : true}});
    res.json(data);
    console.log('Retrieved data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});


// POST route to add data
router.post('/data', async (req, res) => {
  const { _id, di1 } = req.body; // Assuming your request body has _id and di1
  try {
    const newData = new DataModel({
      _id,
      data: {},
        io: {
          di1,
        },
        dev: {

        }
      
    });
    await newData.save();
    res.status(201).json({ message: 'Data added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding data' });
  }
});

module.exports = router;
