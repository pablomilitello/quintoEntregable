import { Router } from 'express';
import UsersManager from '../Dao/UsersManagerMongo.js';

const router = Router();
const usersManager = new UsersManager();

router.get('/', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  const newUser = await usersManager.createUser(req.body);
  if (newUser) {
    res.redirect('/register/login');
  } else {
    res.redirect('/register/errorRegister');
  }
});

router.get('/errorRegister', (req, res) => {
  res.render('errorRegister');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await usersManager.loginUser(req.body);
  if (user) {
    req.session['email'] = email;
    req.session['password'] = password;
    req.session['logged'] = true;
    res.redirect('/views/realtimeproducts');
  } else {
    res.redirect('/register/errorLogin');
  }
});

export default router;
