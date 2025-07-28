import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { username, password, email, fullName, phone } = req.body;

  try {
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ message: 'Username already exists' });

    const emailExists = await User.findOne({ email });
    if (emailExists) return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      fullName,
      phone
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user: { id: user._id, username: user.username, fullName: user.fullName, email: user.email, phone: user.phone } });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

export const protectedRoute = (req, res) => {
  res.json({ message: `Hello ${req.user.username}, this is protected.` });
};
