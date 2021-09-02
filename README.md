# front cli vue web模板
一个基于vuejs工程模板

## 技术栈
+ vue.js v2.6
+ vue-router
+ vuex
+ axios
+ vant

## 基础配置


## 本地开发
```
npm install
// 调试
npm run dev
// 构建生产环境
npm run build:prod
```

## 部署
### 构建docker镜像
```
npm run build:prod
docker build -t web:v1.0.0 .
```

### 启动镜像
```
docker run -d -p 3001:80 --name web-demo --restart=always web:v1.0.0
```
