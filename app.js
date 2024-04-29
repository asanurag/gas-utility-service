const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { authorizeCustomer } = require('./utils/auth');

const app = express();


app.use(bodyParser.json());


mongoose.connect('mongodb+srv://asshivam01:BKPvtsmzIV1RaDUd@cluster0.lxvf8ic.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api/customers', require('./routes/customers'));
app.use('/api/requests', authorizeCustomer, require('./routes/requests'));
app.use('/csr', require('./routes/csr'));
app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Server started on port 3000');
});