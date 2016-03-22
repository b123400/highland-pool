'use strict';

var _ = require('highland');
var Pool = require('./index');

exports.maxConcurrency = function(test) {
	test.expect(10);
	
	var max = 2;
	var pool = Pool(max);
	var counter = {
		_count : 0,
		set count(val) {
			test.ok(val <= max, "stream count ("+val+") <= max ("+max+")");
			this._count = val;
		},
		get count(){
			return this._count;
		}
	}

	function makeStream() {
		return _(function(push, next){
			counter.count++;
			setTimeout(function(){
				push(null, 1);
			}, 100);
			setTimeout(function(){
				push(null, 2);
			}, 200);
			setTimeout(function(){
				push(null, 3);
			}, 300);
			setTimeout(function(){
				push(null, 4);
			}, 400);
			setTimeout(function(){
				push(null, 5);
			}, 500);
			setTimeout(function(){
				counter.count--;
				push(null, _.nil);
			}, 600);
		});
	}

	var streams = [
		pool(makeStream()),
		pool(makeStream()),
		pool(makeStream()),
		pool(makeStream()),
		pool(makeStream())
	];

	var runningCount = 0;
	streams.forEach(function(s) {
		runningCount++;
		s.done(function(){
			runningCount--;
			if (runningCount === 0) {
				test.done();
			}
		});
	});
}