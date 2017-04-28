/*!
 * application initialization
 * xiewulong <xiewulong@vip.qq.com>
 * create: 2017/04/29
 * since: 0.0.1
 */
'use strict';

const peppa = require('../');
const alias = peppa.alias();

// 设置别名, 必须以'@'开头
alias('app', __dirname);
alias('@app', __dirname);

// 获取别名路径
console.log(alias('@app'));
console.log(alias('@app/foo'));
console.log(alias('@app/foo/bar'));
console.log(alias('@app/foo/bar/qux'));

// 非别名路径原样返回
console.log(alias('app/normal/path/will/original/return'));
