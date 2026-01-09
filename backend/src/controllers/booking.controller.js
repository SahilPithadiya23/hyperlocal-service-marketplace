const Booking = require('../models/book.models');
const UserModel = require('../models/user.model');
// Create a new booking (user must be authenticated)
exports.createBooking = async (req, res) => {
  try {
    const { provider, issue, serviceDate, serviceTime, address } = req.body;

    if (!provider || !issue || !serviceDate || !serviceTime || !address) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const booking = await Booking.create({
      user: req.user._id,
      provider,
      issue,
      serviceDate,
      serviceTime,
      address,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all bookings (optional filters via query: user, provider, status)
exports.getBookingsUser = async (req, res) => {
  try {
   const user = req.user._id;
  const usrExists = await UserModel.findById(user);
  if(!usrExists) {
    return res.status(400).json({message: "User not found"});
  }
    const bookings = await Booking.find({ user }).populate('provider');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single booking by ID
exports.getBookingsProvider = async (req, res) => {
  try {
    const bookings = await Booking.find({ provider: req.params.id })
      .populate('user', 'firstName lastName email')
      .populate('provider', 'firstName lastName serviceName email');

    if (!bookings) return res.status(404).json({ message: 'No bookings found' });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update booking (status, times, address, reviewGiven, etc.)
// exports.updateBooking = async (req, res) => {
//   try {
//     const { status, completedAt, reviewGiven, issue, serviceDate, serviceTime, address } = req.body;

//     const updates = { status, completedAt, reviewGiven, issue, serviceDate, serviceTime, address };
//     Object.keys(updates).forEach((k) => updates[k] === undefined && delete updates[k]);

//     const booking = await Booking.findByIdAndUpdate(
//       req.params.id,
//       updates,
//       { new: true }
//     );

//     if (!booking) return res.status(404).json({ message: 'Booking not found' });

//     res.json(booking);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// Delete booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
