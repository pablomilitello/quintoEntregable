import { Router } from 'express';

const router = Router();

const users = [
  {
    username: 'juan',
    password: '12345',
  },
  {
    username: 'carla',
    password: 'abcde',
  },
];

router.post('/', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.json({ message: 'User not found' });
  }
  const isPassword = user.password === password;
  if (isPassword) {
    req.session['username'] = username;
    req.session['password'] = password;
    req.session['logged'] = true;
    res.json({ message: 'Welcome', username });
    return;
  }
  return res.json({ message: 'Invalid password' });
});

router.get('/prueba', (req, res) => {
  if (req.session?.username) {
    res.send(`Welcome, ${req.session.username}`);
    return;
  }
  res.redirect('/login');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

export default router;
