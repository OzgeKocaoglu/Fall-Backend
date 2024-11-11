const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

// Register a new user
const register = async (req, res, next) => {

  const { Nickname, Email, Password, Level, HighScore } = req.body;

  if (!validateEmail(Email)) {
    return res.status(400).json({ message: Email + 'is not valid.' });
  }

  const existingUser = await User.findOne({ Nickname });
  const existingEmail = await User.findOne({ Email });

  if (existingUser || existingEmail) {
    return res.status(400).json({ message: Nickname + ' or ' + Email + ' is already taken.' });
  }
  
  try {
    const user = new User({ Nickname, Email, Password, Level, HighScore });
    await user.save();
    res.json({ message: 'Registration successful' });
  } catch (error) {
    next(error);
  }
};

  // Login with an existing user
const login = async (req, res, next) => {
    const { Nickname, Password} = req.body;
  
    try {
      const user = await User.findOne({ Nickname });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // const hashedPassword = await bcrypt.hash(Password, 10);
      const passwordMatch = await bcrypt.compare(Password, user.Password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: '1 hour'
      });
      res.json({ token });
    } catch (error) {
      next(error);
    }
  };

  module.exports = { register, login };