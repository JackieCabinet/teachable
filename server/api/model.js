const sequelize = require('sequelize');
const db = require('./db.config.js');

const LectureCompletion = db.define('completion', {
	User_Name: sequelize.STRING,
	User_Email: sequelize.STRING,
	User_id: sequelize.INTEGER,
	Lecture_ID: sequelize.INTEGER,
	Lecture_Completion_Date: sequelize.DATE,
	Sign_In_Count: sequelize.INTEGER,
	Last_Sign_In: sequelize.DATE
})


LectureCompletion.sync().then(() => {
  console.log('LectureCompletion table successfully created.')
})

module.exports = LectureCompletion