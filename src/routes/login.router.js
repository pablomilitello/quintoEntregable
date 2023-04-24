import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  if (req.session.username) {
    res.redirect('/loginSession/prueba');
    return;
  }
  res.render('login');
});

export default router;
