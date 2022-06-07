const Router = require('express');
const router = new Router();
const bookRouter = require('./bookRouter');
const typeRouter = require('./typeRouter');
const userRouter = require('./userRouter');
const authorRouter = require('./authorRouter');
const checkRole = require('../middlewares/checkRoleMiddleware');

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/author', authorRouter);
router.use('/book', bookRouter);

module.exports = router;