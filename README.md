# lp-workbox-cdn
[![npm (scoped with tag)](https://img.shields.io/npm/v/lp-workbox-cdn.svg)](https://npmjs.com/package/lp-workbox-cdn)

[![NPM downloads](https://img.shields.io/npm/dm/lp-workbox-cdn.svg)](https://npmjs.com/package/lp-workbox-cdn)

[![install size](https://packagephobia.now.sh/badge?p=lp-workbox-cdn)](https://packagephobia.now.sh/result?p=lp-workbox-cdn)

[Workbox](https://developers.google.com/web/tools/workbox)非官方CDN，独立NPM包。



### 为什么做这个？

- 默认情况下workbox会托管在storage.googleapis.com上，在国内部分地区可能无法访问。
- 当使用`workbox-cli`生成文件到本地时，占用大小大约8MB，而实际使用不到1MB。
- 生成到本地的，默认情况下走的还是storage.googleapis.com的引用，仍无法达到快速且正常访问。



### 使用

#### 1.UNPKG

```
https://unpkg.com/lp-workbox-cdn@3.6.3-3/workbox/workbox-sw.js
```

#### 2.ALICDN

```
https://g.alicdn.com/mylib/lp-workbox-cdn/3.6.3-2/workbox/workbox-sw.js
```

#### 3.NPM自己生成

安装

```
npm install lp-workbox-cdn
```

在安装目录下执行

```
npm run build
```

选择安装方式

![](https://images.gitee.com/uploads/images/2019/0118/023556_7a2e605c_335765.png "屏幕截图.png")

然后发布到自己的npm即可。

---

 GitHub：[lecepin](https://github.com/lecepin)

