const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  type: { type: String, required: true },
  details: { type: String, required: true },
  attachments: [{ type: String }],
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  statusHistory: [
    {
      status: { type: String, required: true },
      updatedAt: { type: Date, default: Date.now },
    },
  ],
  messages: [
    {
      sender: { type: String, required: true }, 
      message: { type: String, required: true },
      sentAt: { type: Date, default: Date.now },
    },
  ],
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;