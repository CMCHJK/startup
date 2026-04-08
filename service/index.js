const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const DB = require('./database.js');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

function broadcastEvent(event) {
  const message = JSON.stringify(event);
  console.log('Broadcasting event:', message);
  console.log('Connected clients:', wss.clients.size);

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(message);
    }
  });
}

wss.on('connection', (socket) => {
  console.log('WebSocket connection opened');

  socket.send(JSON.stringify({
    msg: 'connected to server'
  }));

  socket.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send({ msg: 'unauthorized' });
  }

  const user = await DB.getUserByToken(token);

  if (!user) {
    return res.status(401).send({ msg: 'unauthorized' });
  }

  req.userEmail = user.email;
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

  const existing = await DB.getUser(email);
  if (existing) {
    return res.status(409).send({ msg: 'user already exists' });
  }

  const hash = await bcrypt.hash(password, 10);
  const token = uuid.v4();

  await DB.addUser({
    email: email,
    password: hash,
    token: token,
  });

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: false,
  });

  res.send({ email: email });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await DB.getUser(email);

  if (!user) {
    return res.status(401).send({ msg: 'invalid email or password' });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).send({ msg: 'invalid email or password' });
  }

  const token = uuid.v4();
  await DB.updateUserToken(email, token);

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: false,
  });

  res.send({ email: email });
});

app.delete('/api/auth/logout', async (req, res) => {
  const token = req.cookies.token;

  if (token) {
    const user = await DB.getUserByToken(token);
    if (user) {
      await DB.updateUserToken(user.email, null);
    }
  }

  res.clearCookie('token');

  res.send({});
});

app.get('/api/auth/me', async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send({ msg: 'unauthorized' });
  }

  const user = await DB.getUserByToken(token);

  if (!user) {
    return res.status(401).send({ msg: 'unauthorized' });
  }

  res.send({ email: user.email });
});

app.get('/api/checkins', authMiddleware, async (req, res) => {
  const checkins = await DB.getCheckinsByUser(req.userEmail);
  res.send(checkins);
});

app.post('/api/checkins', authMiddleware, async (req, res) => {
  const { sleepHours, exerciseMinutes, stress, mood, date } = req.body;

  const entry = {
    id: uuid.v4(),
    userEmail: req.userEmail,
    sleepHours: Number(sleepHours),
    exerciseMinutes: Number(exerciseMinutes),
    stress: Number(stress),
    mood: Number(mood),
    date: date || new Date().toLocaleString(),
    createdAt: new Date(),
  };

  await DB.addCheckin(entry);

  console.log('Check-in saved for:', req.userEmail);

  broadcastEvent({
    msg: `${req.userEmail} submitted a check-in`
  });

  res.send(entry);
});

app.get('/api/quote', async (req, res) => {
  try {
    const response = await fetch('https://zenquotes.io/api/random');
    const data = await response.json();

    res.send({
      content: data[0].q,
      author: data[0].a,
    });
  } catch {
    res.status(500).send({ msg: 'failed to fetch quote' });
  }
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});