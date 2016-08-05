var request = require('request');
var express = require('express');
var mustache = require('mustache');
var fs = require('fs');
var app = express();

var ipAddress = '192.168.1.244';
var passwd = 'admin'
var filePath = __dirname + '/public/smappee.html';


app.get('/api', function (req, res) {
	request.post('http://'+ipAddress+'/gateway/apipublic/logon', {body : passwd}, function(err,httpResponse,body){
		if(err != null) {
			console.log(err);
			res.status(500).send('Error loging in. Did you remember to specify a password in index.js?');
		}
		else {
			request.post('http://'+ipAddress+'/gateway/apipublic/instantaneous', {body:'loadInstantaneous'}, function(err,httpResponse,body){
				if(err != null){
					console.log(err);
					res.status(500).send('Error while fetching data.')
				}
				else{
					//console.log(httpResponse);
					res.set('Content-Type', 'application/json');
					res.send(body);
				}
			})
		}
	})
});

app.get('/', function (req, res) {
	var apiUrl = req.protocol + "://" + req.get('host') + req.originalUrl + "api";
	console.log(apiUrl);
	fs.readFile(filePath, function (err, content) {
		res.send(mustache.render(content.toString(), {'ApiURL' : apiUrl}))
	});
	
});


app.use(function(req, res, next) {
	// CORS
	res.header("Access-Control-Allow-Origin", "*");

    next();
});

app.listen(3000, function () {
	console.log('Smappiapi Proxy listening on port 3000!');
});
