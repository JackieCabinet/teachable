const sequelize = require('sequelize');
const LectureCompletion = require('./model.js')


module.exports = {
	teachGet: function(req,res){
		var greet = {greet : "Bonjour Au Monde"};
		res.json(greet);
	},
	teachPost: function(req,res){
		console.log('in post');
		console.log(req.body);
		if(req.body.type === "lectureprogress.created"){
			LectureCompletion.create({
				User_Name: req.body.object.user.name,
				User_Email: req.body.object.user.email,
				User_id: req.body.object.user.id,
				Lecture_ID: req.body.object.lecture.id,
				Lecture_Completion_Date: req.body.created,
				Sign_In_Count: req.body.object.user.sign_in_count,
				Last_Sign_In: req.body.object.user.last_sign_in_at
			})
		}
		res.send(req.body);
	}
}