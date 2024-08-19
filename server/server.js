const express = require('express');
const connectDB = require('./config/db'); // Connect to MongoDB
const cors = require('cors'); 
const path = require('path'); 

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/users', require('./routes/api/users')); // Adjusted path to the users route
app.use('/api/posts', require('./routes/api/posts')); // Assuming postRoutes exist and are correctly named

// Serve React App (Production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build'))); // Serve static files from the React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html')); // Serve the React app for any other routes
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
