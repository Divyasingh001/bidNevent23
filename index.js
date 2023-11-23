const connectToMango = require('./database.js');
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

connectToMango();
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.json());
const port = 5501;
app.use(express.urlencoded({ extended: true }));
let vendorDetails = [];
app.post('/api/itemdetails/EnterDetails', (req, res) => {
  const newVendorDetail = req.body;
  vendorDetails.push(newVendorDetail);
  res.json({ success: true });
});
app.get('/api/vendor/details', (req, res) => {
  res.json({ success: true, data: vendorDetails });
});

app.use('/api/vendorauth', require('./routes/vendorauth'));
app.use('/api/customerauth', require('./routes/customerauth'));
app.use('/api/itemdetails', require('./routes/itemdetails'));
app.use('/api/bidding', require('./routes/bidding'));
app.use(express.static(path.join(__dirname, 'Frontend')));

// Use separate routes for different HTML files
app.get('/', (req, res) => {
  console.log('Request received for index.html');
  return res.sendFile(path.join(__dirname, 'Frontend', 'index.html'));
});

app.get('/VendorSignup', (req, res) => {
  console.log('Request received for VendorSignup.html');
  return res.sendFile(path.join(__dirname, 'Frontend', 'VendorSignup.html'));
});

app.get('/customersignup', (req, res) => {
  console.log('Request received for customerSignup.html');
  return res.sendFile(path.join(__dirname, 'Frontend', 'customersignup.html'));
});

app.get('/vendorbid', (req, res) => {
  console.log('Request received for Vendorbid.html');
   return res.sendFile(path.join(__dirname, 'Frontend', 'vendorbid.html'));
});

// Catch-all route for 404
app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, '127.0.0.1', () => {
  console.log(`Bidnvent backend listening on http://127.0.0.1:${port}`);
});

