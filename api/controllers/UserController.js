const User = require('../models/User');
const bcrypt = require('bcrypt');
const createUserToken = require('../helpers/create-user-token');

module.exports = class UserController {

    // REGISTRO
    static async register(req, res) {
        try {
            const { name, email, password, confirmpassword, phone } = req.body;

            // Validações
            if (!name || !email || !password || !confirmpassword || !phone) {
                return res.status(422).json({ message: "Preencha todos os campos obrigatórios" });
            }

            if (password !== confirmpassword) {
                return res.status(422).json({ message: "A senha e a confirmação precisam ser iguais" });
            }

            // Validação mínima de senha
            if (password.length < 6) {
                return res.status(422).json({ message: "A senha deve ter no mínimo 6 caracteres" });
            }

            // Verifica usuário existente
            const userExists = await User.findOne({ where: { email } });
            if (userExists) {
                return res.status(422).json({ message: "Usuário já cadastrado" });
            }

            // Hash da senha
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);

            // Criação
            const newUser = await User.create({
                name,
                email,
                password: passwordHash,
                phone
            });

            // Token
            return createUserToken(newUser, req, res);

        } catch (error) {
            console.error('Erro no register:', error);
            return res.status(500).json({ message: "Erro interno no servidor" });
        }
    }

    // LOGIN
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(422).json({ message: "E-mail e senha são obrigatórios" });
            }

            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            const checkPassword = await bcrypt.compare(password, user.password);

            if (!checkPassword) {
                return res.status(401).json({ message: "Senha inválida" });
            }

            return createUserToken(user, req, res);

        } catch (error) {
            console.error('Erro no login:', error);
            return res.status(500).json({ message: "Erro interno no servidor" });
        }
    }
};