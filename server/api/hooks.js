const LectureCompletion = require('./model.js')
const json2csv = require('json2csv');
const fs = require('fs');

module.exports = {
	teachGet: function(req,res){
		let dataArray;
		let usefulData;
		let fields;

		LectureCompletion.findAll()
			.then((data) => {
				let csv;
				fields = ['User Name', 'User Email', 'User ID', 'Lecture ID', 'Lecture Completion Date', 'Sign In Count', 'Last Sign In'];
				usefulData = data.map((value) => {
					  return {
					    "User Name": value.User_Name,
					    "User Email": value.User_Email,
					    "User ID": value.User_id,
					    "Lecture ID": value.Lecture_ID,
					    "Lecture Completion Date": value.Lecture_Completion_Date,
					    "Sign In Count": value.Sign_In_Count,
					    "Last Sign In": value.Last_Sign_In
					  }
				});
				csv = json2csv({ data: usefulData, fields: fields });
				fs.writeFile('file.csv', csv, (err) => {
				  if (err) throw err;
					res.download('./file.csv');
				});
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
