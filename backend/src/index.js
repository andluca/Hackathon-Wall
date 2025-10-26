// Arquivo principal do servidor Express
// Configura middlewares, aplica o roteador principal e inicia o servidor

const express = require('express');
const cors = require('cors');
require('dotenv/config');
const allRoutes = require('./routes/index');

// Configuração do App
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API Hackathon Wall Pronta!'));

app.use('/api', allRoutes);

// Listener
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/`);
  console.log(`API Ideas: http://localhost:${PORT}/api/ideas`);
});
