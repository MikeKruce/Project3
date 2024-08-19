const express = require('express');
const connectDB = require('./config/db'); // Adjust the path if necessary
const cors = require('cors'); // Add this line to import the cors package
const path = require('path'); // Add this line to import the path package

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/users', require('./routes/api/users')); // Adjusted path to the new users route handler
app.use('/api/posts', require('./routes/postRoutes')); // Assuming this route exists

// Serve React App
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});