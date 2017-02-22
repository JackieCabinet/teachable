const Sequelize = require('sequelize');
const db = require('./db.config.js');

const LectureCompletion = db.define('completion', {
	User_Name: Sequelize.STRING,
	User_Email: Sequelize.STRING,
	User_id: Sequelize.INTEGER,
	Lecture_ID: Sequelize.INTEGER,
	Lecture_Completion_Date: Sequelize.DATE,
	Sign_In_Count: Sequelize.INTEGER,
	Last_Sign_In: Sequelize.DATE
})


LectureCompletion.sync().then(() => {
  console.log('Review table successfully created.')
})

module.exports = LectureCompletion;
