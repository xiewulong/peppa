/*!
 * alias
 * xiewulong <xiewulong@vip.qq.com>
 * create: 2017/04/14
 * since: 0.0.1
 */
'use strict';

const path = require('path');

module.exports = function() {
	let aliases = {};

	return function(name, _path) {
		if(_path) {
			aliases[name] = _path;
			return;
		}

		if(name.indexOf('@')) {
			return name;
		}

		let pos = name.indexOf(path.sep);
		let _name = pos == -1 ? name : name.slice(0, pos);

		return name.replace(_name, aliases[_name]);
	};
};
