const LectureCompletion = require('./model.js')


module.exports = {
	teachGet: function(req,res){
		console.log('inside get');
		LectureCompletion.findAll()
			.then((data) => {
				console.log(`data = ${data}`);
				data.forEach((row) => {
					console.log(`row.object = ${row.object}`);
				});
				res.json({"data": data});
			})
			.catch((err) => {
				throw err;
			});
	},
	teachPost: function(req,res){
		console.log('in post');
		console.log(req.body);
		if(req.body.type === "LectureProgress.created"){
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



		// console.log('inside GET');
		// var greet = {greet : "Bonjour Au Monde"};
		// res.json("greet");
