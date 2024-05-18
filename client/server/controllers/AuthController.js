const { User } = require('../models');

exports.register = async (req, res) => {
  try {
    const { username, email, password, numtel } = req.body;
    const user = await User.create({
      username,
      email,
      password,
      numtel
    });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
    try {
        console.log(req.body); // Log entire request body
        const { email, password } = req.body;
        console.log(email); // Check if email is correctly received
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      res.json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
