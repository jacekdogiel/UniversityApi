var express = require ("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
    res.render("search");
});

app.get("/results", function(req, res){
    var search = req.query.search;
    var name = req.query.name;
    var page = req.query.page;
    var url = "http://universities.hipolabs.com/search?country="+search+"&name="+name;
    
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data;
            data = JSON.parse(body);
            res.render("results", {data: data, page: page, name: name});
        }
        else{console.log("Page not found.")}
    });
});

app.listen(3000);