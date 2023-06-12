const { User } = require('../models/User');

// Function to validate user input
const validateUserInput = async (req, res, next) => {
  try {
    // Create a new user object based on the request body
    const user = new User(req.body);
    await user.validate();

    next();
  } catch (error) {
    // If validation fails, return the error response
    return res.status(400).json({ error: error.message });
  }
};

module.exports = validateUserInput;