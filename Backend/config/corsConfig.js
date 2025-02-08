const cors = require('cors');

const allowedOrigins = [
  'http://localhost:3000',
  'https://airbus-challenge-fronted.vercel.app'
];

const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = cors(corsOptions);
