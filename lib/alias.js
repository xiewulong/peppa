/*!
 * alias
 * xiewulong <xiewulong@vip.qq.com>
 * create: 2017/04/14
 * since: 0.0.1
 */
'use strict';

const path = require('path');

module.exports = () => {
	let aliases = {};

	return (name, _path) => {
		let index = name.indexOf('@');

		if(_path) {
			if(index) {
				console.error('Error: Alias must start with @.');
				return false;
			}

			aliases[name] = _path;

			return true;
		}

		if(index) {
			return name;
		}

		let pos = name.indexOf(path.sep);
		let _name = pos < 0 ? name : name.slice(0, pos);
		let original = aliases[_name];

		if(original == path.sep && pos >= 0) {
			original = '';
		}

		return name.replace(_name, original);
	};
};
