/*!
 * alias
 * xiewulong <xiewulong@vip.qq.com>
 * create: 2017/04/14
 * since: 0.0.1
 */
'use strict';

const path = require('path');

module.exports = function(cwd = process.cwd(), dirname = 'envs') {
	console.dir(path.join(cwd, dirname));
};
