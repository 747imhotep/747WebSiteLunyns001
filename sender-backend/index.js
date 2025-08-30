const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Replace these with your real credentials
const API_KEY = 'YOUR_REAL_API_KEY_HERE';
const LIST_ID = 'YOUR_REAL_LIST_ID_HERE';

// Middleware to parse JSON body
app.use(express.json());

// POST /subscribe
app.post('/subscribe', async (req, res) => {
  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  try {
    const response = await axios.post('https://api.sender.net/v2/subscribers', {
      email,
      name: name || '',
      listIds: [LIST_ID]
    }, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Subscriber added successfully',
      data: response.data
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to add subscriber',
      error: err.response?.data || err.message
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
