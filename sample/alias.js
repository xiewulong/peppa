/*!
 * application initialization
 * xiewulong <xiewulong@vip.qq.com>
 * create: 2017/04/29
 * since: 0.0.1
 */
'use strict';

const peppa = require('../');
const alias = peppa.alias();

// 设置别名
alias('@app', __dirname);

// 获取别名路径
console.log(alias('@app'));
console.log(alias('@app/apps'));
console.log(alias('@app/common'));
