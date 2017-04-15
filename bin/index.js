#!/usr/bin/env node

'use strict';

const program = require('commander');

const pkg = require('../package.json');

program
	.version(pkg.version)
	.option('init', 'Application environment initialization')
	.parse(process.argv);
