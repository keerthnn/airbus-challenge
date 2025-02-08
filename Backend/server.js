const express = require('express');
const { PORT } = require('./config/dotenvConfig');
const corsConfig = require('./config/corsConfig');
const flightRoutes = require('./routes/flightRoutes');

const app = express();

app.use(corsConfig);
app.use(express.json());

app.use('/api', flightRoutes);

app.get('/', (req, res) => {
  console.log('Root route accessed.');
  res.send("Server is running.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
