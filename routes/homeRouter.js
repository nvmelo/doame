const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const  { campoVazio, campoRepetido, formatoValido } = require('../middlewares/Valida');

router.get('/', homeController.view);
router.post('/login', homeController.auth);
router.get('/logout', homeController.logout);
router.get('/obrigado', homeController.thanks);
router.get('/perfil/edit', homeController.editPerfil);
router.post('/perfil/edit', campoVazio, campoRepetido, formatoValido, homeController.editPerfil);

module.exports = router;