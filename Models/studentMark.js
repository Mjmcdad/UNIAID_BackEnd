const { DataTypes } = require('sequelize');
const sequelize = require('../dataBase');

const StudentMark = sequelize.define('StudentMark', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    enrollmentId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
    },
    finalMark: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    midtermMark: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    practicalMark: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    assignmentMark: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = StudentMark;