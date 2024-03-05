// server.js
import express from "./common";
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const googleAuth = require('./routes/googleAuth');
const bodyParser = require('body-parser');

const passport = require('passport');
const session = require('express-session');

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

// Passport session setup
app.use(session({
    secret: 'your_secret_key',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', googleAuth);
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
