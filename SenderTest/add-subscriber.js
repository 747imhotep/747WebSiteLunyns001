const axios = require('axios');

const SENDER_API_KEY = 'YOUR_API_KEY_HERE';
const ZzmLgD5 = 'YOUR_LIST_ID_HERE';

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
