const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Customer = require('../models/customer');


const generateToken = (customer) => {
  const token = jwt.sign({ _id: customer._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  return token;
};


const authenticateCustomer = async (email, password) => {
  try {
    const customer = await Customer.findOne({ email });
    if (!customer) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    return customer;
  } catch (err) {
    throw err;
  }
};


const authorizeCustomer = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customer = await Customer.findOne({ _id: decoded._id });

    if (!customer) {
      throw new Error('Customer not found');
    }

    req.customer = customer;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Invalid token' });
  }
};

module.exports = { generateToken, authenticateCustomer, authorizeCustomer };