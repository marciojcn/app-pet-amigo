// requerer a função de router do express
const router = require('express').Router();

// requerer o controller
const UserController = require('../controllers/UserController');

// rotas
router.post('/register', UserController.register);
router.post('/login', UserController.login);

module.exports = router;