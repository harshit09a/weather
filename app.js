var express = require("express");
var app =express();
var request = require("request");
app.get("/result",function(req,res){
	var query = req.query.search;
	request("http://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=f01b7b9da1d176a33d3ac8c2975ff12c",function(error,response,body){
		
		if(!error&&response.statusCode==200)
			{
				var data = JSON.parse(body);
				if(data["cod"]==404)
				res.send("<h1>not found</h1>")
				else
					
				res.render("result.ejs",{data:data});
			}
		
	})
})
app.get("/",function(req,res){
	res.render("search.ejs");
})
app.listen(3000,function(){

	console.log("server started");
})
