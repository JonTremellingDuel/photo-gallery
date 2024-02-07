// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({credentials: true, origin: 'https://localhost:3001'}));
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/photo-gallery', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/api/endpoint', (req, res) => {
  // Log the received JSON data
  console.log('Received JSON data:', req.body);

  // Send a response
  res.status(200).json({ message: 'JSON data received successfully' });
});

// Routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
