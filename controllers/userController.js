import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password field
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
}

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id, '-password'); // Exclude password field
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, fullname, phone } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });  
    if (username) user.username = username;
    if (email) user.email = email;
    if (fullname) user.fullname = fullname;
    if (phone) user.phone = phone;
    user.updatedAt = Date.now();
    await user.save();
    res.status(200).json({ message: 'User updated successfully', user: { id: user._id, username: user.username, fullname: user.fullname, email: user.email, phone: user.phone } });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
}

export const updateUserPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.updatedAt = Date.now();
    await user.save();
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
}


export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
}