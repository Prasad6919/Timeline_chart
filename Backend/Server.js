// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRouter = require('./models/api'); // Path might vary based on your directory structure

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies

app.use('/api', apiRouter); // Use your API router

// mongoose.connect('mongodb://0.0.0.0:27017', {
  mongoose.connect('mongodb+srv://parasusawant6919:prasad69@cluster0.be9yyho.mongodb.net/Employee?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch(err => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
