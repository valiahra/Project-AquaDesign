const router = require('express').Router();
const authRouter = require('./auth.api.router');
const tokenRouter = require('./token.api.router');
const fountainRouter = require('./fountain.api.router');
const orderRouter = require('./order.api.router');
const messagesRouter = require('./messages.api.router');
const fountainAdminRouter = require('./fountainAdmin.api.router');
const selectionsRouter = require('./selection.api.router');
const filtersRouter = require('./filter.api.router');

router.use('/tokens', tokenRouter);
router.use('/auth', authRouter);
router.use('/fountains', fountainRouter);
router.use('/orders', orderRouter);
router.use('/messages', messagesRouter);
router.use('/fountainsAdmin', fountainAdminRouter);
router.use('/constructors', selectionsRouter);
router.use('/ourWorks', filtersRouter);

module.exports = router;
