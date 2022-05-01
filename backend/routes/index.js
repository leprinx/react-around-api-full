const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const { validateLogin, validateteRegistration } = require('../middlewares/validations');
const { login, createUser } = require('../controllers/users');

router.post('/signin', validateLogin, login);
router.post('/signup', validateteRegistration, createUser);
router.use(auth);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use((req, res) => {
  res.status(404).send({ message: 'Reqested resource not found' });
});
module.exports = router;
