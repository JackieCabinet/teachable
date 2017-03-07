const LectureCompletion = require('./models/completions');
const User = require('./models/users')
const json2csv = require('json2csv');
const fs = require('fs');
const path = require('path');
const dirname = path.dirname;
const bcrypt = require('bcrypt')


module.exports = {
	userLogin: function(req,res){
		console.log("in server");
		console.log(`req.body.username = ${req.body.username}`);
		let username = req.body.username;
		let password = req.body.password;
		var hashedPass = bcrypt.hash(password, 10, function(err, hash){
			console.log('hashed', hash)
			return hash;
		})
		User.findOne({where:{Username:username}})
		.then(function(user){
			console.log(hashedPass, 'hashedpass');
			bcrypt.compare(password, user.dataValues.Password, function(err, result) {
    			if(result===true){
    				console.log('should download')
					res.sendFile(__dirname + '/secured.html');
    			} else {console.log('did not work');}
			});
		})
		
	},
	userPost: function(req,res){
		console.log('in post');
		console.log(req.body);
		var tempPass = req.body.password;
		var hashed = bcrypt.hash(tempPass, 10, function(err, hash){
			User.create({
				Username: req.body.username,
				Password: hash
			})
		})
		res.send("posted");
	},
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
	},
	teachDelete: function(req,res){
		console.log('in delete');
		LectureCompletion.findAll()
		.then((data) => {
			//JSON.parse(data);
			var yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000); //maybe change this to be week prior?
			for(var i = 0; i < data.length; i++){
				if(data[i].dataValues.createdAt < yesterday){
					var dataID = data[i].dataValues.id;
					LectureCompletion.destroy({
						where: {
							id: dataID
						},
						truncate: true
					})
				}
			}
		})
		res.send('deleted')
	}
}

//2017-02-21 03:35:34 +0000
