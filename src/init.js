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
const stdin = require('./stdin');

const encoding = 'utf-8';

class Initializer {

	constructor(cwd = process.cwd(), dirname = 'envs') {
		this.cwd = path.resolve(cwd);
		this.dir = path.join(this.cwd, dirname);
		this.envs = require(this.dir);

		console.log('Application Initialization');
		this.choose();
	}

	recurse(cb = filePath => filePath, parents = []) {
		let dir = path.join.apply(null, [this.dir, this.env.path].concat(parents));
		fs.readdirSync(dir).forEach((file) => {
			let _file = path.join(dir, file);
			let stat = fs.statSync(_file);

			if(!stat) {
				return;
			} else if(stat.isDirectory()) {
				this.recurse(cb, parents.concat(file));
			} else if(stat.isFile()) {
				cb(parents.concat(file));
			}
		});
	}

	init() {
		console.log();

		if(!this.env) {
			console.log(colors.cyan('  Environment configuration does not exist!'));
			return this.quit();
		}

		console.log('  Start initialization ...');

		console.log();
		this.recurse((filePath) => {
			let file = path.join.apply(null, [this.dir, this.env.path].concat(filePath));
			let _file = path.join.apply(null, [this.cwd].concat(filePath));
			let content = fs.readFileSync(file, {encoding});
			let action = 'overwrite';

			if(!fs.existsSync(_file)) {
				let _dir = path.dirname(_file);
				if(!fs.existsSync(_dir)) {
					fs.mkdirSync(_dir, 0o755);
				}

				action = ' generate';
			} else if(fs.readFileSync(_file, {encoding}) === content) {
				action = 'unchanged';
			}

			action != 'unchanged' && fs.writeFile(_file, content, {encoding, mode: 0o644});
			console.log('  %s %s', action, filePath.join(path.sep));
		});

		console.log();
		console.log('  ... initialization completed.');
		console.log();
	}

	confirm() {
		console.log();

		if(!this.env) {
			console.log(colors.cyan('  Environment configuration does not exist!'));
			return this.quit();
		}

		process.stdout.write(`  Initialize the application under '${this.env.name}' environment? [yes|no] `);
		stdin((chunk) => {
			switch(chunk) {
				case 'y':
				case 'yes':
					this.init();
					break;
				default:
					this.quit();
					break;
			}
		});
	}

	choose() {
		console.log();

		if(!this.envs.length) {
			console.log(colors.blue('  Please config environments first!'));
			return this.quit();
		}

		console.log('Which environment do you want the application to be initialized in?');

		console.log();
		this.envs.forEach((env, i) => {
			console.log('  [%s] %s', i, env.name);
		});

		console.log();
		process.stdout.write(`  Your choice [0-${this.envs.length - 1}, or "q" to quit] `);
		stdin((chunk) => {
			switch(chunk) {
				case 'q':
					this.quit();
					break;
				default:
					this.env = this.envs[chunk];
					this.confirm();
					break;
			}
		});
	}

	quit() {
		console.log();
		console.log('  Quit initialization.');
		console.log();
	}

}

module.exports = (cwd, dirname) => {
	new Initializer(cwd, dirname);
};
