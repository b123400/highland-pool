'use strict';

var _ = require('highland');

module.exports = function(max) {
	var streamingCount = 0;
	var pendingCallbacks = [];

	return function(stream) {
		return _(function(push, next) {

			function startConsume() {
				streamingCount++;
				stream
					.on('error', function(err) {
						push(err);
						finishConsume();
					})
					.each(function(x) {
						push(null, x);
					})
					.done(finishConsume);
			}

			function finishConsume() {
				push(null, _.nil);
				streamingCount--;
				if (pendingCallbacks.length) {
					pendingCallbacks.shift()();
				}
			}

			if (streamingCount < max) {
				startConsume();
			} else {
				pendingCallbacks.push(startConsume);
			}
		});
	}
};