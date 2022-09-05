const router = require('express').Router();
const userRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', moviesRouter);

module.exports = router;
