
module.exports = {
	teachGet: function(req,res){
		var greet = {greet : "Bonjour Au Monde"};
		res.json(greet);
	},
	teachPost: function(req,res){
		console.log('in post');
		res.send(req.body);
	}
}