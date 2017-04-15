#!/usr/bin/env node
'use strict';

const program = require('commander');

const pkg = require('../package.json');

program.version(pkg.version);

program
	.command('init [path]')
	.action((path) => {
	});

program.parse(process.argv);
