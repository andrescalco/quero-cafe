var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require('path');

// APP CONFIG
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.get('/', function (req, res) {
	res.render('index');
});

app.get('/lista', function (req, res) {
	res.render('lista');
});

io.sockets.on('connection', function (client) {
	client.on('toServer', function (msg) {
		client.emit('listNames', msg);
		client.broadcast.emit('listNames', msg);
	});
});

server.listen(3000, function(){
	console.log("Rodando o server!");
});