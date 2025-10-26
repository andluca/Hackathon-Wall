// Roteador principal da aplicação
// Agrupa todos os roteadores de recursos (como 'ideas', 'users', etc.)

import { Router } from 'express';
import ideaRoutes from './idea.routes.js';

const router = Router();

router.use('/ideas', ideaRoutes);

export default router;
