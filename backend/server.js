const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const bookings = [];

app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

app.post('/api/bookings', (req, res) => {
  const booking = req.body;

  if (!booking.name || !booking.date) {
    return res.status(400).json({ message: 'Name and date are required' });
  }

  bookings.push(booking);
  res.status(201).json({ message: 'Booking created', booking });
});

app.get('/', (req, res) => {
  res.send('Welcome to the Barbing Salon Booking API');
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//Controller
//Routes
//Models
//Repositories
//Services
//Middlewares
//Utilities
//Helpers
//Configurations

