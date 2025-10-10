const axios = require('axios');

const API_KEY = 'SENDER_API_KEY'; // Replace with real Sender.net API key
const LIST_ID = 'ZzmLgD5'; // Replace with your list ID

const subscriber = {
  email: 'test@example.com',
  name: 'Test User',
  listIds: [LIST_ID]
};

axios.post('https://api.sender.net/v2/subscribers', subscriber, {
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
})
.then(res => {
  console.log('✅ Success:', res.data);
})
.catch(err => {
  console.error('❌ Error:', err.response?.data || err.message);
});
