const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;
const createRoute = require('./routes/api/create');
const readRoute = require('./routes/api/read');
const updateRoute = require('./routes/api/update');
const deleteRoute = require('./routes/api/delete');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Back-end is running!');
});

const weatherRoute = require('./routes/api/weather');

app.use('/api/weather', weatherRoute);
// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use('/api/create', createRoute);

app.use('/api/read', readRoute);
app.use('/api/update', updateRoute);
app.use('/api/delete', deleteRoute);

connectDB();
