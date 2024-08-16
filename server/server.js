const express = require('express');
const mongoose = require('mongoose');
const serverApp = require('./serverApp'); // Import the Express app

const PORT = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/artStudio')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Could not connect to MongoDB', error));

// Start the server
serverApp.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
