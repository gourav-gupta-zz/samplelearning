// var fs = require('fs');
// var http = require('http');
// var socketio = require('socket.io');

// // // // var Emitter  = require('events');

// // // var Resources = require('./resources');


// // // // var emitr = new Emitter();

// // // // emitr.on('greet', function(){
// // // // 	console.log('hello! gourav');
// // // // });

// // // // emitr.on('greet', function(){
// // // // 	console.log('how are you?');
// // // // });

// // // // emitr.emit('greet');

// // // // for(var i=0;i<4;i++){

// // // // 	for(var k=3;k>i;k--){
// // // // 		process.stdout.write(' ');
// // // // 	}
// // // // 	for(var j=0;j<=i;j++){
// // // // 		process.stdout.write('*');
// // // // 	}
// // // // 	for(var j=1;j<=i;j++){
// // // // 		process.stdout.write('*');
// // // // 	}
// // // // 	process.stdout.write('\n');
// // // // }

// // // // for(var i=0;i<4;i++){

// // // // 	for(var k=0;k<i;k++){
// // // // 		process.stdout.write(' ');
// // // // 	}
// // // // 	for(var j=4;j>i;j--){
// // // // 		process.stdout.write('*');
// // // // 	}
// // // // 	for(var j=3;j>i;j--){
// // // // 		process.stdout.write('*');
// // // // 	}
// // // // 	process.stdout.write('\n');
// // // // }

// // // // for(var i=0;i<4;i++){

// // // // 	for(var j=0;j<4;j++){
// // // // 		if(j==i){

// // // // 			process.stdout.write('*'+i+j);
// // // // 		}
// // // // 	}
// // // // 	process.stdout.write('\n');
// // // // }

// // // var r = new Resources(7);

// // // r.on('start', function(){
// // // 	console.log('event start');
// // // });
// // // r.on('data', function(c){
// // // 	console.log('events fired', c);
// // // });

// // // r.on('end', function(r){
// // // 	console.log('total events fired', r);
// // // })

// // process.stdin.on('data', function(data){
// // 	process.stdout.write('hello' +data);
// // });

// // process.stdin.on('end', function(){
// // 	process.stdout.write('end');
// // });


// var handleRequest = function(req, res){
// 	fs.readFile(__dirname+'/index.html', function(err, data){
// 		if(err){
// 			res.writeHead(500);
// 			console.log(err);
// 		}else{
// 			res.writeHead(200);
// 			res.end(data);
// 		}
// 	});	
// }

// var app = http.createServer(handleRequest);

// var io = socketio.listen(app);

// io.sockets.on('connection', function(socket){
// 	setInterval(function(){
// 		var timeStamp = Date.now();
// 		console.log('Emitted',timeStamp);
// 		socket.emit('timer', timeStamp);
// 	}, 2000)

// 	socket.on('submit', function(data){
// 		console.log('submitted data', data);
// 	});
// });

// app.listen(3000);

// var exec = require('child_process').exec;

// var child = exec('uptimdfe', function(err, stdout, stderr){
// 	if(err){
// 		console.log('Error:'+stderr);
// 	}else{
// 		console.log('output is :'+stdout);
// 	}
// });

// console.log('process id is', child.pid);

// var spawn = require('child_process').spawn;

// var ps = spawn('ps',['aufsdfx']);
// var grep = spawn('grep',['node']);

// ps.stdout.pipe(grep.stdin);
// grep.stdout.pipe(process.stdout);

// ps.stderr.on('data', function(data){
// 	console.log('Error:',data);
// });	

// grep.stderr.on('data', function(data){
// 	console.log('Error:',data);
// });

// var fork  = require('child_process').fork;

// var child = fork(__dirname+'/emitter.js');

// child.on('message',function(data){
// 	console.log('child message',data.msg);
// });

// child.send({msg:'hi'});
// child.send({msg:'hey'});

var cluster = require('cluster');
var http = require('http');
var noWorker = 2;

if(cluster.isMaster){
	for(var i=0;i<noWorker;i++){
		console.log('worker init');
		cluster.fork();
	}

	cluster.on('fork', function(worker){
		console.log('worker fork:',worker.id);
	});

	cluster.on('online', function(worker){
		console.log('worker online:',worker.id);
	});

	cluster.on('listening', function(worker, address){
		console.log('worker listening:'+worker.id+' on address '+address.address);
	});

	cluster.on('exit', function(worker, code, signal){
		console.log('worker exit:'+worker.id);
		console.log(code);
		console.log(signal);
	});
}else{
	console.log('worker listen:',cluster.worker.id);
	var count = 0;
	http.createServer(function(req, res){
		res.writeHead(200);
		count++;
		console.log('worker increase count '+cluster.worker.id+' count now '+count);
		res.end('worker increase count '+cluster.worker.id+' count now '+count);
		if(count===3){
			cluster.worker.destroy();
		}
	}).listen(3000,'127.0.0.1');
}

