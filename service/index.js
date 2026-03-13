const express = require('express');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.get('/api/test', (req, res) => {
  res.send({ msg: 'startup service works' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});