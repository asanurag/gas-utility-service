const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const customer = new Customer({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
    });

    await customer.save();
    res.status(201).send(customer);
  } catch (err) {
    res.status(400).send(err);
  }
});


router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.send(customers);
  } catch (err) {
    res.status(500).send(err);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send();
    res.send(customer);
  } catch (err) {
    res.status(500).send(err);
  }
});


router.patch('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customer) return res.status(404).send();
    res.send(customer);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;