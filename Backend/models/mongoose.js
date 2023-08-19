const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  _id: String,
  data: { 
   
  },
  io: {
    di1: Number,
  },
  dev:{
    
  }
});

const DataModel = mongoose.model('charts', dataSchema);


module.exports = DataModel;