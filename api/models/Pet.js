const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Pet = db.define('Pet', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    weight: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true
    },
    images: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '[]',
        get() {
            const rawValue = this.getDataValue('images');
            try {
                return rawValue ? JSON.parse(rawValue) : [];
            } catch {
                return [];
            }
        },
        set(value) {
            this.setDataValue('images', JSON.stringify(value || []));
        }
    },
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
}, {
    tableName: 'pets',
    timestamps: true
});

module.exports = Pet;