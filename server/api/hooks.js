
module.exports = {
	teachGet: function(req,res){
		var greet = {greet : "Bonjour Au Monde"};
		res.json(greet);
	},
	teachPost: function(req,res){
		console.log('in post');
		console.log(req.body);
		res.send(req.body);
	}
}