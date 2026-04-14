const { Sequelize } = require('sequelize');
require('dotenv').config();

const conn = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: 3306,
        define: {
            timestamps: true
        },
        logging: false // deixa mais limpo no console
    }
);

// Teste de conexão correto (async)
conn.authenticate()
    .then(() => {
        console.log('Banco de Dados conectado com sucesso 🚀');
    })
    .catch((error) => {
        console.error('Erro ao conectar no banco:', error);
    });

module.exports = conn;