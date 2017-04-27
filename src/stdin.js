/*!
 * lib
 * xiewulong <xiewulong@vip.qq.com>
 * create: 2017/04/27
 * since: 0.0.1
 */
'use strict';

module.exports = (cb = chunk => chunk) => {
	process.stdin.resume();
	process.stdin.setEncoding('utf-8');
	process.stdin.once('data', (chunk) => {
		process.stdin.pause();
		cb(chunk.slice(0, -1).toLowerCase());
	});
};
