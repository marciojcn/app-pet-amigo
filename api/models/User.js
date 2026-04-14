const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true // valida formato automaticamente
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '' // evita null no frontend
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users' // garante nome correto no banco
});

module.exports = User;