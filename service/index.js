const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());

const users = [];
const sessions = {};

app.get('/api/test', (req, res) => {
  res.send({ msg: 'startup service works' });
});

app.post('/api/auth/create', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ msg: 'missing email or password' });
  }

  const existing = users.find((u) => u.email === email);
  if (existing) {
    return res.status(409).send({ msg: 'user already exists' });
  }

  const hash = await bcrypt.hash(password, 10);

  users.push({
    email: email,
    password: hash,
  });

  res.send({ email: email });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});