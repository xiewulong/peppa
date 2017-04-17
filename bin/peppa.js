#!/usr/bin/env node
'use strict';

const program = require('commander');

const pkg = require('../package.json');
const init = require('../src/init.js');

program
	.version(pkg.version)
	.usage('<command> [option...]');

program
	.command('initialize [dirname] [cwd]')
	.alias('init')
	.description('application initialization')
	.action((dirname, cwd) => {
		init(cwd, dirname);
	})
	.on('--help', () => {
		console.log('  Examples:');
		console.log('');
		console.log('    $ peppa init');
		console.log('    $ peppa init envs');
		console.log('    $ peppa init envs sample');
		console.log('');
	});

program
	.command('*')
	.action((command) => {
		program.help();
	})
	._noHelp = true;

program
	.on('--help', () => {
		console.log('  Examples:');
		console.log('');
		console.log('    application initialization:');
		console.log('    $ peppa init');
		console.log('');
	})
	.parse(process.argv);

process.argv.length == 2 && program.help();
