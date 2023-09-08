CodeHunter 项目前端代码
====


#### 前端技术

- JavaScript框架：Vue
- Webpack
- node
- yarn
- eslint
- @vue/cli 3.2.1


项目下载和运行
----

- 拉取项目代码
```bash
git clone https://github.com/ayaeum/CodeHunter-Vue.git
cd  jeecg-boot/ant-design-vue-jeecg
```

- 安装依赖
```
yarn install
```

- 开发模式运行
```
yarn run serve
```

- 编译项目
```
yarn run build
```

- Lints and fixes files
```
yarn run lint
```

Docker镜像启动前端（单体模式）
----

 ``` 
# 1.配置host

    127.0.0.1   jeecg-boot-system

# 2.修改前端项目的后台域名
    .env.development
    域名改成： http://jeecg-boot-system:8080/jeecg-boot
   
# 3.进入项目根目录，执行打包命令
  yarn run build

# 4.构建镜像
  docker build -t jeecgboot-ui2 .

# 5.启动镜像
  docker run --name jeecgboot-ui-vue2 -p 80:80 -d jeecgboot-ui2

# 6.访问前台项目
  http://localhost
``` 






