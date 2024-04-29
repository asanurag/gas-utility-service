const Request = require('../models/request');


exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('customer');
    res.send(requests);
  } catch (err) {
    res.status(500).send(err);
  }
};


exports.getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate('customer');
    if (!request) return res.status(404).send();
    res.send(request);
  } catch (err) {
    res.status(500).send(err);
  }
};


exports.updateRequestStatus = async (req, res) => {
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
};

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          messages: { sender: 'csr', message },
        },
      },
      { new: true }
    );

    if (!request) return res.status(404).send();

    res.send(request);
  } catch (err) {
    res.status(400).send(err);
  }
};