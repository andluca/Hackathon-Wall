// Roteador principal da aplicação
// Agrupa todos os roteadores de recursos (como 'ideas', 'users', etc.)

const { Router } = require('express');
const ideaRoutes = require('./idea.route');

const router = Router();

router.use('/ideas', ideaRoutes);

export default router;
