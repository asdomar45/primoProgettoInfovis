
var fs = require('fs');
var express = require('express');
var app = express();

fs.readFile('ragni.html', function (err, html) {
	if (err) {
		throw err; 
	}   
	app.get('/', function (req, res) {
		res.writeHeader(200, {"Content-Type": "text/html"}); 
		res.write(html);  
		res.end();
	});
});

fs.readFile('ragni.js', function (err, script) {
	if (err) {
		throw err; 
	}  
	app.get('/ragni', function (req, res) {
		res.type('.js')
		res.send(script);
		res.end();
	});
});

fs.readFile('ragni.json', function (err, file) {
	if (err) {
		throw err; 
	}  
	json = JSON.parse(file);
	app.get('/ragniJson', function (req, res) {
		res.send(json);
		res.end();
	});
});

app.listen(8000, function(){
    console.log('Server running on 8000...');
});