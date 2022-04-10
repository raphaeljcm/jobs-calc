const express = require('express');
const app = express();
const path = require('path');

// Routes
const jobRoutes = require('./routes/jobRoute');
const profileRoutes = require('./routes/profileRoute');

const PORT = 3000;

// Middlewares
app.use('/', jobRoutes);
app.use('/profile', profileRoutes);
app.use('/', express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

// EJS
app.set('view engine', 'ejs');
// I won't need this line below because my package.json and node_modules and my views folder are in the same root
// app.set('views', path.join(__dirname, './views'));