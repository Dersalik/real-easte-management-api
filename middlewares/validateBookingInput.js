const { Booking } = require('../models/Booking');

// Function to validate user input
const validateBookingInput = async (req, res, next) => {
  try {
    // Create a new user object based on the request body
    const Booking = new Booking(req.body);
    await Booking.validate();

    // If validation passes, set the validated user object on the request object
    next();
  } catch (error) {
    // If validation fails, return the error response
    return res.status(400).json({ error: error.message });
  }
};

module.exports = validateBookingInput;