const { DataTypes } = require('sequelize');
const sequelize = require('../config/dataBase');

const Room = sequelize.define('Room', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    floor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isPractical: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

module.exports = Room;
