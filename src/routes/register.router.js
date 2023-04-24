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
    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
      req.session['isAdmin'] = true;
    } else {
      req.session['isAdmin'] = false;
    }
    res.redirect('/views/realtimeproducts');
  } else {
    res.redirect('/register/errorLogin');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

export default router;
