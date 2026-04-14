require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./db/conn');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

// Models
require('./models/User');
require('./models/Pet');

// Routes
const UserRoutes = require('./routes/UserRoutes');
const PetRoutes  = require('./routes/PetRoutes');

const api = express();

// JSON
api.use(express.json());

// CORS (ajustável depois para produção)
api.use(cors());

// Pasta pública (imagens acessíveis via URL)
api.use('/public', express.static('public'));

// Swagger
api.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota base
api.get('/', (req, res) => {
    res.json({
        status: 'API ONLINE 🚀',
        message: 'Projeto acadêmico funcionando'
    });
});

// Rotas
api.use('/users', UserRoutes);
api.use('/pets',  PetRoutes);

// Middleware de erro global
api.use((err, req, res, next) => {
    console.error('Erro:', err);
    res.status(500).json({
        error: err.message || 'Erro interno no servidor'
    });
});

const PORT = process.env.PORT || 4040;

// Banco + servidor
db.authenticate()
    .then(() => {
        console.log('Banco conectado com sucesso 🚀');

        api.listen(PORT, '0.0.0.0', () => {
            console.log(`Servidor rodando na porta ${PORT}`);
            console.log(`Swagger: http://localhost:${PORT}/api-docs`);
        });
    })
    .catch(error => {
        console.error('Erro ao conectar banco:', error);
        process.exit(1);
    });