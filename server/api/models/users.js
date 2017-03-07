const sequelize = require('sequelize');
const db = require('../db.config');
const LectureCompletion = require('./completions')

const User = db.define('user', {
	Username: sequelize.STRING,
	Password: sequelize.STRING
})


User.sync().then(() => {
  console.log('User table successfully created.')
})

module.exports = User;
