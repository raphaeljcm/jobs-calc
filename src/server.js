const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

// Routes
const jobRoutes = require('./routes/jobRoute');
const profileRoutes = require('./routes/profileRoute');
const dashboardRoutes = require('./routes/dashboardRoute');

const PORT = 3000;

// Middlewares
app.use('/', dashboardRoutes);
app.use('/job', jobRoutes);
app.use('/profile', profileRoutes);
app.use('/', express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

// EJS
app.set('view engine', 'ejs');
// I won't need this line below because my package.json and node_modules and my views folder are in the same root
// app.set('views', path.join(__dirname, './views'));

// DATABASE
mongoose.connect('mongodb://localhost/jobs-calc', (err, db) => {
  if(err) {
    console.log(err);
  }
  console.log('Database connected');
});

let db = mongoose.connection;

db.once('open', () => console.log('Database running...'));
db.once('error', () => console.log('Error trying to run the database...'));