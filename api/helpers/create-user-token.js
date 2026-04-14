const jwt = require('jsonwebtoken');

const createUserToken = (user, req, res) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET não definido nas variáveis de ambiente');
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.status(200).json({
            message: "Login realizado com sucesso",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Erro ao gerar token:', error);
        return res.status(500).json({
            message: "Erro ao gerar token"
        });
    }
};

module.exports = createUserToken;