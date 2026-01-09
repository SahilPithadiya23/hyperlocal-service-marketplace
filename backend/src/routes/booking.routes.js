const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const { authUserMiddleware, authCommonMiddleware } = require('../middlewares/auth.middleware');

// Create booking (user only)
router.post('/', authUserMiddleware, bookingController.createBooking);

// List bookings (auth required; can be used by both roles based on token)
router.get('/', authUserMiddleware, bookingController.getBookingsUser);

// Get a single booking
router.get('/:id', authCommonMiddleware, bookingController.getBookingsProvider);

// Update a booking
// router.put('/:id', authCommonMiddleware, bookingController.updateBooking);

// Delete a booking
router.delete('/:id', authCommonMiddleware, bookingController.deleteBooking);

module.exports = router;
