const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN || 'secret';

app.get('/webhook', (req, res) => {
  const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;
  console.log('ENV TOKEN:', verifyToken);
  console.log('RECEIVED TOKEN:', token);
  console.log('MODE:', mode);
  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});

app.post('/webhook', (req, res) => {
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`\n\nWebhook received ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).end();
});

app.listen(port, () => {
  console.log(`\nListening on port ${port}\n`);
});