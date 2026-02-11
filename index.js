const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const recipesRouter = require('./routes/recipes');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/recipeBlog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
app.use('/', recipesRouter);

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
