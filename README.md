# Peppa

应用管理和配置工具集.

## 目录

<details>

* [安装](#安装)
* [别名管理](#别名管理)
* [简化stdin输入](#简化stdin输入)
* [配置初始化](#配置初始化)
* [License](#license)

</details>

## 安装

```bash
$ npm i [-g] peppa
```

## 别名管理

应用管理中, 经常会用到文件路径的抽象管理, 为常用的路径提供别名以方便调用.

```js
const alias = require('peppa').alias();

// 设置别名, 必须以'@'开头
alias('app', __dirname);  // -> Error: Alias must start with @.
alias('@app', __dirname);

// 获取别名路径
console.log(alias('@app'));  // -> /home/xiewulong/peppa/sample
console.log(alias('@app/foo'));  // -> /home/xiewulong/peppa/sample/foo
console.log(alias('@app/foo/bar'));  // -> /home/xiewulong/peppa/sample/foo/bar
console.log(alias('@app/foo/bar/qux'));  // -> /home/xiewulong/peppa/sample/foo/bar/qux

// 非别名路径原样返回
console.log(alias('app/normal/path/will/original/return'));  // -> app/normal/path/will/original/return
```

## 简化stdin输入

nodejs的process.stdin用起来挺麻烦的, 干脆封装一个让代码组织起来更舒服.


```js
// stdin.js
const peppa = require('peppa');

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
```

```bash
$ node stdin.js
Hey, baby! Do you like peppa? [yes/no] y
Yes, I like her.
```

## 配置初始化

```bash
$ peppa init
```

## License

MIT - [xiewulong](https://github.com/xiewulong)
