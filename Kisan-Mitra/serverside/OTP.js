require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 5000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Initialize Twilio client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Temporary storage for OTPs (in a real-world application, you'd use a database)
let otpStorage = {};  // e.g., { phoneNumber: { otp: '123456', expiresAt: <timestamp> } }

// Generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
};

// Send OTP to user's phone via SMS
const sendOTP = async (phoneNumber, otp) => {
  try {
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
    console.log(`OTP sent to ${phoneNumber}`);
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Failed to send OTP');
  }
};

// Endpoint for generating and sending OTP
app.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  // Generate OTP and store it with expiry time (e.g., 5 minutes)
  const otp = generateOTP();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes expiry

  otpStorage[phoneNumber] = { otp, expiresAt };

  try {
    await sendOTP(phoneNumber, otp);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP' });
  }
});

// Endpoint for verifying the OTP
app.post('/verify-otp', (req, res) => {
  const { phoneNumber, otp } = req.body;

  if (!phoneNumber || !otp) {
    return res.status(400).json({ message: 'Phone number and OTP are required' });
  }

  // Check if the OTP exists in storage and is not expired
  const storedData = otpStorage[phoneNumber];

  if (!storedData) {
    return res.status(400).json({ message: 'OTP not sent or expired' });
  }

  if (Date.now() > storedData.expiresAt) {
    // OTP expired
    delete otpStorage[phoneNumber]; // Remove expired OTP
    return res.status(400).json({ message: 'OTP expired' });
  }

  if (storedData.otp !== otp) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  // OTP verified successfully, proceed with further actions
  delete otpStorage[phoneNumber]; // Remove OTP after successful verification
  res.status(200).json({ message: 'OTP verified successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
