var express = require("express");
var app =express();
var request = require("request");
var flash = require("connect-flash");
app.use(flash());
app.use(require("express-session")({
	secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
	
}));
app.use(function(req, res, next){
   
	res.locals.error = req.flash("error");
		
		
   next();
});
app.get("/result",function(req,res){
	var query = req.query.search;
	request("http://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=f01b7b9da1d176a33d3ac8c2975ff12c",function(error,response,body){
		
		if(!error&&response.statusCode==200)
			{
				var data = JSON.parse(body);
				res.render("result.ejs",{data:data});
			}
			else
				{
					req.flash("error",req.query.search+" not found try another place");
					res.redirect("back");
					
				}
	})
})
app.get("/",function(req,res){
	res.render("search.ejs");
})
app.listen(process.env.PORT||3000,function(){

	console.log("server started");
})
