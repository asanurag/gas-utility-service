const express = require('express');
const router = express.Router();
const csrController = require('../../controllers/csrController');


router.get('/requests', csrController.getAllRequests);


router.get('/requests/:id', csrController.getRequestById);

router.post('/requests/:id/messages', csrController.sendMessage);


router.patch('/requests/:id/status', csrController.updateRequestStatus);

module.exports = router;