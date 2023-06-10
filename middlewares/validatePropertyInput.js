const { User, Property } = require('../models/Property');

// Function to validate user input
const validatePropertyInput = async (req, res, next) => {
  try {
    // Create a new user object based on the request body
    const property = new Property(req.body);
    await property.validate();

    // If validation passes, set the validated user object on the request object
    next();
  } catch (error) {
    // If validation fails, return the error response
    return res.status(400).json({ error: error.message });
  }
};

module.exports = validatePropertyInput;