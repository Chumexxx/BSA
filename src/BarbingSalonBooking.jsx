import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Input,
  Select,
  Text,
  Heading,
  VStack,
  Divider,
} from '@chakra-ui/react';
import axios from 'axios';

const BarbingSalonBooking = () => {
  const [name, setName] = useState('');
  const [barber, setBarber] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [bookings, setBookings] = useState([]);

  // 🔁 Fetch bookings on load
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleBooking = async () => {
    if (name && barber && service && date && time) {
      try {
        const response = await axios.post('http://localhost:5000/api/bookings', {
          name,
          barber,
          service,
          date,
          time,
        });

        setConfirmation(`Booking Confirmed! ${response.data.message}`);
        setName('');
        setBarber('');
        setService('');
        setDate('');
        setTime('');
        fetchBookings(); // 🔁 Refresh bookings
      } catch (error) {
        setConfirmation('Booking failed. Please try again.');
      }
    } else {
      setConfirmation('Please fill all fields.');
    }
  };

  return (
    <Box maxW="md" mx="auto" py={6}>
      <Heading mb={4}>Book Your Haircut</Heading>

      <Box p={4} borderWidth={1} borderRadius="lg" boxShadow="md">
        <Input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          mb={2}
        />
        <Select placeholder="Choose Barber" value={barber} onChange={(e) => setBarber(e.target.value)} mb={2}>
          <option value="John">John</option>
          <option value="Mike">Mike</option>
          <option value="Sam">Sam</option>
        </Select>
        <Select placeholder="Choose Service" value={service} onChange={(e) => setService(e.target.value)} mb={2}>
          <option value="Haircut">Haircut</option>
          <option value="Shave">Shave</option>
          <option value="Hair Wash">Hair Wash</option>
        </Select>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          mb={2}
        />
        <Input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          mb={2}
        />
        <Button onClick={handleBooking} colorScheme="teal" width="full" mt={2}>
          Book Appointment
        </Button>
        {confirmation && <Text mt={4} color="green.500">{confirmation}</Text>}
      </Box>

      {/* 🔽 Display Existing Bookings */}
      <Box mt={8}>
        <Heading size="md" mb={4}>Existing Bookings</Heading>
        <VStack spacing={3} align="stretch">
          {bookings.length === 0 ? (
            <Text>No bookings yet.</Text>
          ) : (
            bookings.map((booking, index) => (
              <Box key={index} p={3} borderWidth={1} borderRadius="md">
                <Text><strong>Name:</strong> {booking.name}</Text>
                <Text><strong>Barber:</strong> {booking.barber}</Text>
                <Text><strong>Service:</strong> {booking.service}</Text>
                <Text><strong>Date:</strong> {booking.date}</Text>
                <Text><strong>Time:</strong> {booking.time}</Text>
              </Box>
            ))
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default BarbingSalonBooking;
