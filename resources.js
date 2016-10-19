var util = require('util');
var EventEmitter = new require('events').EventEmitter;

function getResources(c){
	var maxCount = c;
	var self = this;
	process.nextTick(function(){
		var count = 0;
		self.emit('start');
		var t = setInterval(function(){
			self.emit('data', count);
			if(++count == c){
				clearInterval(t);
				self.emit('end',c);
			}
		}, 10);
	});
}

util.inherits(getResources, EventEmitter);

module.exports = getResources;