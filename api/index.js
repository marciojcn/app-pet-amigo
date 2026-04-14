require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./db/conn');

// Models (apenas carregar)
require('./models/User');
require('./models/Pet');

// Routes
const UserRoutes = require('./routes/UserRoutes');

const api = express();

// JSON
api.use(express.json());

// CORS aberto (qualquer IP do universo 🌎)
api.use(cors());

// Pasta pública
api.use('/public', express.static('public'));

// Rota base (IMPORTANTE)
api.get('/', (req, res) => {
    res.json({
        status: 'API ONLINE 🚀',
        message: 'Projeto acadêmico funcionando'
    });
});

// Rotas
api.use('/users', UserRoutes);

const PORT = process.env.PORT || 4040;

// Banco + servidor
db.sync()
    .then(() => {
        console.log('Banco conectado com sucesso');

        api.listen(PORT, '0.0.0.0', () => {
            console.log(`Servidor rodando na porta ${PORT}`);
            console.log(`Acesso local: http://localhost:${PORT}`);
            console.log(`Acesso rede: http://SEU_IP:${PORT}`);
        });
    })
    .catch(error => {
        console.error("Erro ao conectar/sincronizar banco:", error);
    });

// Tratamento de erro simples
api.use((err, req, res, next) => {
    console.error('Erro:', err);
    res.status(500).json({
        error: 'Erro interno no servidor'
    });
});