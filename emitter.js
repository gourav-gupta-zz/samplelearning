// function Emitter(){
// 	this.events = {};
// }

// Emitter.prototype.on = function(type, listener){
// 	this.events[type] = this.events[type] || [];
// 	this.events[type].push(listener);
// }

// Emitter.prototype.emit = function(type){
// 	if(this.events[type]){
// 		this.events[type].forEach(function(listener){
// 			listener();
// 		});
// 	}
// }

// module.exports = Emitter;

// process.on('message', function(data){
// 	if(data.msg === 'hi'){
// 		console.log('parent:',data.msg);
// 		process.send({msg:'hello gourav'});
// 	}else{
// 		console.log('parent:',data.msg);
// 		process.send({msg:'Bye!!'})
// 		process.exit();
// 	}
// });