// src/BookingForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookingForm() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch bookings from backend on page load
  useEffect(() => {
    axios.get('http://localhost:5000/api/bookings')
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !date) {
      setMessage('Name and date are required.');
      return;
    }

    axios.post('http://localhost:5000/api/bookings', { name, date })
      .then(res => {
        setMessage('Booking successful!');
        setBookings(prev => [...prev, res.data.booking]);
        setName('');
        setDate('');
      })
      .catch(err => {
        console.error(err);
        setMessage('Something went wrong.');
      });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <button type="submit">Book</button>
      </form>

      {message && <p>{message}</p>}

      <h3>All Bookings</h3>
      <ul>
        {bookings.map((b, index) => (
          <li key={index}>{b.name} - {b.date}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookingForm;
