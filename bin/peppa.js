#!/usr/bin/env node
'use strict';

const commander = require('commander');

const pkg = require('../package.json');
const init = require('../lib/init');

commander
	.version(pkg.version)
	.usage('<command> [option...]');

commander
	.command('init [dirname] [cwd]')
	// .alias('initialize')
	.description('application initialization')
	.action((dirname, cwd) => {
		init(cwd, dirname);
	})
	.on('--help', () => {
		console.log('  Examples:');
		console.log();
		console.log('    $ peppa init');
		console.log('    $ peppa init envs');
		console.log('    $ peppa init envs sample');
		console.log();
	});

commander
	.command('*')
	.action((command) => {
		commander.help();
	})
	._noHelp = true;

commander
	.on('--help', () => {
		console.log('  Examples:');
		console.log();
		console.log('    application initialization:');
		console.log('    $ peppa init');
		console.log();
	})
	.parse(process.argv);

process.argv.length == 2 && commander.help();
