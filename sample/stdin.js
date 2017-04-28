/*!
 * application initialization
 * xiewulong <xiewulong@vip.qq.com>
 * create: 2017/04/29
 * since: 0.0.1
 */
'use strict';

const peppa = require('../');

process.stdout.write('Hey, baby! Do you like peppa? [yes/no] ');
peppa.stdin((chunk) => {
  let yes;

  switch(chunk) {
    case 'y':
    case 'yes':
      yes = true;
      break;
    default:
      yes = false;
      break;
  }

  console.log((yes && 'Yes' || 'No') + ', I' + (!yes && ' do not' || '') + ' like her.');
});
