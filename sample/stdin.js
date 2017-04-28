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
  let answer;

  switch(chunk) {
    case 'y':
    case 'yes':
      answer = true;
      break;
    default:
      answer = false;
      break;
  }

  console.log((answer && 'Yes' || 'No') + ', I' + (!answer && ' do not' || '') + ' like her.');
});
