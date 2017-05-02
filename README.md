# Peppa

应用管理和配置工具集

## 目录

<details>

* [安装](#安装)
* [别名管理](#别名管理)
* [简化stdin输入](#简化stdin输入)
* [应用初始化](#应用初始化)
* [License](#license)

</details>

## 安装

```bash
$ npm i [-g] peppa
```

## 别名管理

应用管理中 经常会用到文件路径的抽象管理 为常用的路径提供别名以方便调用

```js
// alias.js
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

nodejs的process.stdin用起来挺麻烦的 干脆封装一个让代码组织起来更舒服

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

## 应用初始化

```bash
$ peppa init [dirname] [cwd]
```

一个应用工程通常需要根据不同的环境运行在不同的配置下

* 开发环境(Development) -> session本地存储、图片本地存储、连接开发数据库
* 测试环境(Testing) -> session本地存储、图片本地存储、连接测试数据库
* 预生产环境(Pre-production) -> session存预生产mongodb、图片存预生产cdn、连接预生产数据库
* 生产环境(Production) -> session存生产mongodb、图片存生产cdn、连接生产数据库

根据开发-上线流程的不同 可能还会有更多的环境配置(如压力测试环境, 甚至是个人专属的开发环境等) 如果都使用if...else...或switch来维护 可配置性和扩展性比较差 特别对当前环境来说其它环境的判断会显得很冗余 从而显得不够优雅

应用初始化工具是为了解决在不同环境下的配置(包括配置文件、密钥、证书等)的切换问题而出现的 零冗余 无缝切换

```
// 工程结构 sample示例 初始化之前
sample/
  apps/
    bar/
      config/
        .gitignore        忽略.local.js结尾的配置文件
        app.js            将合并app.local.js配置
        index.js
    foo/
      config/
        .gitignore        忽略.local.js结尾的配置文件
        app.js            将合并app.local.js配置
        index.js
  common/
    config/
      .gitignore          忽略.local.js结尾的配置文件
      app.js              定义static静态目录为dist/, 并将合并app.local.js配置
      index.js
  envs/
    dev/
      apps/
        bar/
          config/
            app.local.js  定义端口为30002
        foo/
          config/
            app.local.js  定义端口为30001
      common/
        config/
          app.local.js    定义当前环境为development环境
    prod/
      apps/
        bar/
          config/
            app.local.js  定义端口为3002
        foo/
          config/
            app.local.js  定义端口为3001
      common/
        config/
          app.local.js    定义了当前环境为production环境
    index.js              定义环境变量和环境配置目录的关系
```

运行./sample/envs环境配置目录来初始化./sample工程

```bash
$ peppa init envs sample
Application Initialization

Which environment do you want the application to be initialized in?

  [0] Production
  [1] Development

  Your choice [0-1, or "q" to quit] 1

  Initialize the application under 'Development' environment? [yes|no] y

  Start initialization ...

   generate apps/bar/config/app.local.js
   generate apps/foo/config/app.local.js
   generate common/config/app.local.js

  ... initialization completed.

```

```
// 工程结构 sample示例 development初始化后
sample/
  apps/
    bar/
      config/
        .gitignore        忽略.local.js结尾的配置文件
        app.js            将合并app.local.js配置
        app.local.js      development环境配置: 定义端口为30002
        index.js
    foo/
      config/
        .gitignore        忽略.local.js结尾的配置文件
        app.js            将合并app.local.js配置
        app.local.js      development环境配置: 定义端口为30001
        index.js
  common/
    config/
      .gitignore          忽略.local.js结尾的配置文件
      app.js              定义static静态目录为dist/, 并将合并app.local.js配置
      app.local.js        development环境配置: 定义当前环境为development环境
      index.js
  envs/
    dev/
      apps/
        bar/
          config/
            app.local.js  定义端口为30002
        foo/
          config/
            app.local.js  定义端口为30001
      common/
        config/
          app.local.js    定义当前环境为development环境
    prod/
      apps/
        bar/
          config/
            app.local.js  定义端口为3002
        foo/
          config/
            app.local.js  定义端口为3001
      common/
        config/
          app.local.js    定义了当前环境为production环境
    index.js              定义环境变量和环境配置目录的关系
```

```bash
$ peppa init envs sample
Application Initialization

Which environment do you want the application to be initialized in?

  [0] Production
  [1] Development

  Your choice [0-1, or "q" to quit] 0

  Initialize the application under 'Production' environment? [yes|no] y

  Start initialization ...

  overwrite apps/bar/config/app.local.js
  overwrite apps/foo/config/app.local.js
  overwrite common/config/app.local.js

  ... initialization completed.

```

```
// 工程结构 sample示例 production初始化后
sample/
  apps/
    bar/
      config/
        .gitignore        忽略.local.js结尾的配置文件
        app.js            将合并app.local.js配置
        app.local.js      production环境配置: 定义端口为3002
        index.js
    foo/
      config/
        .gitignore        忽略.local.js结尾的配置文件
        app.js            将合并app.local.js配置
        app.local.js      production环境配置: 定义端口为3001
        index.js
  common/
    config/
      .gitignore          忽略.local.js结尾的配置文件
      app.js              定义static静态目录为dist/, 并将合并app.local.js配置
      app.local.js        production环境配置: 定义当前环境为production环境
      index.js
  envs/
    dev/
      apps/
        bar/
          config/
            app.local.js  定义端口为30002
        foo/
          config/
            app.local.js  定义端口为30001
      common/
        config/
          app.local.js    定义当前环境为development环境
    prod/
      apps/
        bar/
          config/
            app.local.js  定义端口为3002
        foo/
          config/
            app.local.js  定义端口为3001
      common/
        config/
          app.local.js    定义了当前环境为production环境
    index.js              定义环境变量和环境配置目录的关系
```

## License

MIT - [xiewulong](https://github.com/xiewulong)
