const express = require('express');
const router = express.Router(); 
const Request = require('../models/request');
const upload = require('../utils/upload');

router.post('/', upload.array('attachments'), async (req, res) => {
  try {
    const { type, details } = req.body;
    const customer = req.customer;
    const attachments = req.files.map((file) => file.path);

    const request = new Request({
      customer: customer._id,
      type,
      details,
      attachments,
    });

    await request.save();
    res.status(201).send(request);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      {
        status,
        $push: {
          statusHistory: { status },
        },
      },
      { new: true }
    );

    if (!request) return res.status(404).send();

    res.send(request);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;