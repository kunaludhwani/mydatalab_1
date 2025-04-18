import Sequelize from 'sequelize';
import sequelize from '../../utils/db';

const users = sequelize.define('users', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type:Sequelize.STRING(100), allowNull: false},
    email: {type:Sequelize.STRING(100) , allowNull: false},
    password: {type:Sequelize.STRING(100) , allowNull: false},
    dob: { type: Sequelize.DATEONLY, allowNull: true },
    address: { type: Sequelize.TEXT, allowNull: true },
    photo: { type: Sequelize.STRING, allowNull: true },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    deletedAt: { type:Sequelize.DATE, allowNull: true, defaultValue: null }
});

users.sync({ force: false }).then(function () {
    console.log('users table created');
  }).catch(function (err) {
    console.error('Error while creating users table', err);
});

module.exports = users;
