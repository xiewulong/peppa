/*!
 * application initialization
 * xiewulong <xiewulong@vip.qq.com>
 * create: 2017/04/14
 * since: 0.0.1
 */
'use strict';

const fs = require('fs');
const path = require('path');

// const colors = require('colors/safe');

const pkg = require('../package.json');

class Initializer {

	constructor(cwd = process.cwd(), dirname = 'envs') {
		this.envPath = path.resolve(cwd, dirname);

		this.getEnvNames();
	}

	getEnvNames() {
		console.dir(fs.readdirSync(this.envPath));
	}

}

module.exports = function(cwd, dirname) {
	let appInitializer = new Initializer(cwd, dirname);
	console.log('Application Initialization');
	console.log();
	console.log('Which environment do you want the application to be initialized in?');
	console.log();
	console.log('  %s', appInitializer.envPath);
};
