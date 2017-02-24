const LectureCompletion = require('./model.js')
var json2csv = require('json2csv');
var fs = require('fs');


module.exports = {
	teachGet: function(req,res){
		console.log('inside get');
		var dataArray;
		var usefulData;
		var fields;

		LectureCompletion.findAll()
			.then((data) => {
				// console.log(`data = ${data}`);
				// dataArray = data.data.slice();
				usefulData = data.map(function(value, index, array) {
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
				fields = ['User Name', 'User Email', 'User ID', 'Lecture ID', 'Lecture Completion Date', 'Sign In Count', 'Last Sign In'];

				// data.forEach((row) => {
				// 	console.log(`row.object = ${row.object}`);
				// });
				// res.json({"data": data});


				var csv = json2csv({ data: usefulData, fields: fields });
				fs.writeFile('file.csv', csv, function(err) {
				  if (err) throw err;
				  console.log('file saved');
					res.download('./file.csv');
				});
				// res.send(usefulData);
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
