const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUserToken = (user, req, res) => {
    try {
        const token = jwt.sign(
            {
                name: user.name,
                id: user.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d' // expira em 7 dias (ótimo pra teste)
            }
        );

        return res.status(200).json({
            message: "Você está autenticado",
            token,
            userId: user.id
        });

    } catch (error) {
        console.error('Erro ao gerar token:', error);
        return res.status(500).json({
            message: "Erro ao gerar token"
        });
    }
};

module.exports = createUserToken;