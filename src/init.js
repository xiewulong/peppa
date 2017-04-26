/*!
 * application initialization
 * xiewulong <xiewulong@vip.qq.com>
 * create: 2017/04/14
 * since: 0.0.1
 */
'use strict';

const fs = require('fs');
const path = require('path');

const colors = require('colors/safe');

const pkg = require('../package.json');

class Initializer {

	constructor(cwd = process.cwd(), dirname = 'envs') {
		this.dir = path.resolve(cwd, dirname);
		this.envs = require(this.dir);

		this.init();
	}

	init() {
		console.log('Application Initialization');
		this.choose();
	}

	start() {
		if(!this.env) {
			console.log(colors.cyan('  Environment configuration does not exist!'));
			return this.quit();
		}

		console.log('start');
	}

	confirm() {
		console.log();

		if(!this.env) {
			console.log(colors.cyan('  Environment configuration does not exist!'));
			return this.quit();
		}

		process.stdout.write(`  Initialize the application under '${this.env.name}' environment? [yes|no] `);
		process.stdin.setEncoding('utf8');

		let chunk;
		process.stdin.on('readable', (a) => {
			chunk = process.stdin.read();
			if(chunk === null) {
				return;
			}

			chunk = chunk.slice(0, -1);
			process.stdin.emit('end');
		});

		process.stdin.on('end', () => {
			if(/^y(es)?/.test(chunk.toLowerCase())) {
				console.log('yes');
			}
			this.start();
		});
	}

	choose() {
		console.log();

		if(!this.envs.length) {
			console.log(colors.cyan('  Please config environments first!'));
			return;
		}

		console.log('Which environment do you want the application to be initialized in?');

		console.log();
		this.envs.forEach((env, i) => {
			console.log('  [%s] %s', i, env.name);
		});

		console.log();
		process.stdout.write(`  Your choice [0-${this.envs.length - 1}, or "q" to quit] `);
		process.stdin.setEncoding('utf8');

		let chunk;
		process.stdin.on('readable', (a) => {
			chunk = process.stdin.read();
			if(chunk === null) {
				return;
			}

			chunk = chunk.slice(0, -1);
			process.stdin.emit('end');
		});

		process.stdin.on('end', () => {
			if(chunk.toLowerCase() == 'q') {
				return this.quit();
			}

			this.env = this.envs[chunk];
			this.confirm();
		});
	}

	quit() {
		console.log();
		console.log('  Quit initialization.');
	}

}

module.exports = function(cwd, dirname) {
	new Initializer(cwd, dirname);
};
