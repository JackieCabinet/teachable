const LectureCompletion = require('./model.js')
var json2csv = require('json2csv');
var fs = require('fs');


module.exports = {
	teachGet: function(req,res){
		console.log('inside get');
		var fields = ['car', 'price', 'color'];
		var myCars = [
		  {
		    "car": "Audi",
		    "price": 40000,
		    "color": "blue"
		  }, {
		    "car": "BMW",
		    "price": 35000,
		    "color": "black"
		  }, {
		    "car": "Porsche",
		    "price": 60000,
		    "color": "green"
		  }
		];
		var csv = json2csv({ data: myCars, fields: fields });
		 
		fs.writeFile('file.csv', csv, function(err) {
		  if (err) throw err;
		  console.log('file saved');
		});
		// LectureCompletion.findAll()
		// 	.then((data) => {
		// 		console.log(`data = ${data}`);
		// 		data.forEach((row) => {
		// 			console.log(`row.object = ${row.object}`);
		// 		});
		// 		res.json({"data": data});
		// 	})
		// 	.catch((err) => {
		// 		throw err;
		// 	});
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
