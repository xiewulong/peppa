# Peppa

应用配置和管理工具集.

## 目录

<details>

* [安装](#安装)
* [应用初始化](#应用初始化)
* [别名](#别名)
* [stdin标准输入](#stdin标准输入)

</details>

## 安装

```bash
$ npm i [-g] peppa
```

## 应用初始化

```bash
$ peppa init
```

## 别名

应用管理中, 后端经常会用到路径管理的抽象管理, 为常用的路径提供别名以方便定义和调用.

```js
const alias = require('peppa').alias();

// 设置别名
alias('@app', __dirname);

// 获取别名路径
console.dir(alias('@app'));  // -> /home/xiewulong/peppa/sample
console.log(alias('@app/apps'));  // -> /home/xiewulong/peppa/sample/apps
console.log(alias('@app/common'));  // -> /home/xiewulong/peppa/sample/common
```

## 简化stdin输入

nodejs的process.stdin用起来挺麻烦的, 干脆封装一个让代码组织起来更舒服.

stdin.js

```js
const peppa = require('peppa');

process.stdout.write('Hey, baby, do you like peppa? [yes/no]');
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

  console.log((yes && 'Yes' || 'No') + ', I' + (yes && '' : ' do not') + ' like her.');
});
```

```bash
$ node stdin.js
Hey, baby, do you like peppa? y
Yes, I like her.
```
