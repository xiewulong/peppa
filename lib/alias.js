/*!
 * Alias
 * xiewulong <xiewulong@vip.qq.com>
 * create: 2017/04/14
 * since: 0.0.1
 */
'use strict';

module.exports = () => {
  let aliases = {};

  return (name, path) => {
    let index = name.indexOf('@');

    if(path) {
      if(index) {
        console.error('Error: Alias must begin with @');
        return false;
      }

      aliases[name] = path;

      return true;
    }

    if(index) {
      return name;
    }

    let pos = name.indexOf('/');
    let _name = pos < 0 ? name : name.slice(0, pos);
    let original = aliases[_name];

    if(original == '/' && pos >= 0) {
      original = '';
    }

    return name.replace(_name, original);
  };
};
