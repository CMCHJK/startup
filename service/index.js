const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());

const users = [];
const sessions = {};

function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  const email = sessions[token];

  if (!email) {
    return res.status(401).send({ msg: 'unauthorized' });
  }

  req.userEmail = email;
  next();
}

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

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).send({ msg: 'invalid email or password' });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).send({ msg: 'invalid email or password' });
  }

  const token = uuid.v4();
  sessions[token] = email;

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'strict'
  });

  res.send({ email: email });
});

app.delete('/api/auth/logout', (req, res) => {
  const token = req.cookies.token;

  if (token) {
    delete sessions[token];
  }

  res.clearCookie('token');

  res.send({});
});

app.get('/api/protected', authMiddleware, (req, res) => {
  res.send({ msg: `hello ${req.userEmail}` });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});