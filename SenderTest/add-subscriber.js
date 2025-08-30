const axios = require('axios');

const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMWY3YmFiNThkNjA2YTBjZDIzNWYyNDU4ZGJjY2Y1MWRjYTBhMDc2NTQ3NDZkZDJiYzIxNTBlYzc4MjVmMTgzYTI5NzU5ODY1NzllYTUwZmMiLCJpYXQiOjE3NTU5NTE5NzIuNzQ4ODk0LCJuYmYiOjE3NTU5NTE5NzIuNzQ4ODk2LCJleHAiOjQ5MDk1NTE5NzIuNzQ2OTc3LCJzdWIiOiIxMDA0NzM4Iiwic2NvcGVzIjpbXX0.HJqBlaqRemjd7qDjAOepLvHSVcm5YsZMuJjOw4f0Jp_AkHuYaG1l9PmFe6EE8_SfLXdWE41u_vKU1_yoMo_Amal0yUHadaIZSNpDQIjrGArwZHLS5YnMKVZsid__QK_DP-MkTUW6skSWyRofilxsdpOb7Lk89DegIUgGCi16WLdli43Fy7LMN5XIKPp6RmE6iAw4BhGufxDsjqFZRxYlG93pIaEixxsqnnA3kV43M8QxDex9n61S_Llp5tP6wbzOmvdLwf1K1zu7cmLGkm21AvpYrJCZjFLSx9-HEjtuT_hw3KF0FUSp33M1Tfgmtld4XdZhkq5XyVhFtSomH2FuQgKphEbS-KEUVYvgTccbL8sPsbRCxRnh5Md18esLFP0nxLzfHJ1bdK8DYY4UTL_cOMNvdxMNwPLV_FnjSuYuadQ_8jKCmHZ3SGVfB8sSfLOI335-ou3_5nVO1Pa0Uehg7aSeGZMHXUYVlx7CcG8GStKnkBb9KzYYxNsK70sOo7PYv2cdyWjmjC0mKWevbdXN08_N8XtCjgS3sTdqxEfc2nGZspsLLpoSBNLnZHQRJJl6Fk03ZOGDClVbdTpsnKRBOBxNG0WO3PQ_bZeOf6TqP92IhrbuPnYpkikLHXxWDsNOq4POco8xOCOuJcmXUzrOYaDJIrO83hdkhxst9CW1lMY';
const LIST_ID = 'ZzmLgD5';

const subscriber = {
  email: 'test@example.com',
  name: 'Test User',
  listIds: ['ZzmLgD5']
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
