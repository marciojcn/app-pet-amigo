const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Pet = db.define('Pet', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weight: {
        type: DataTypes.FLOAT, // melhor para peso com decimal
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    images: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('images');
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
            this.setDataValue('images', JSON.stringify(value));
        }
    },
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
});

module.exports = Pet;