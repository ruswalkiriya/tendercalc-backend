const express = require('express');
const fetch = require('node-fetch');
const app = express();

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL = '@tenderplan';

app.get('/check-subscription', async (req, res) => {
  const userId = req.query.user_id;
  if (!userId) return res.status(400).json({ error: 'Missing user_id' });

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/getChatMember?chat_id=${CHANNEL}&user_id=${userId}`;
  try {
    const telegramRes = await fetch(url);
    const data = await telegramRes.json();
    const status = data?.result?.status;
    const subscribed = ['member', 'administrator', 'creator'].includes(status);
    res.json({ subscribed });
  } catch (e) {
    res.status(500).json({ error: 'Telegram API error', details: e.message });
  }
});

app.get('/', (req, res) => {
  res.send('TenderCalc backend is alive!');
});

app.listen(3000, () => {
  console.log('TenderCalc backend running on port 3000');
});