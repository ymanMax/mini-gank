# Gank
基于Gank.io开放API开发的微信小程序，提供干货内容浏览、搜索、添加等功能，界面简洁易用。

## 功能特性
- **内容浏览**：支持查看All、Android、iOS、休息视频、福利、拓展资源、前端、瞎推荐、App等多个分类的干货内容
- **上拉刷新**：支持上拉刷新获取最新的干货内容
- **下拉加载**：支持下拉加载更多的干货内容
- **搜索功能**：支持根据关键词搜索干货内容
- **添加功能**：支持用户添加自己喜欢的干货内容
- **表单验证**：对用户输入的内容进行简单的表单验证

## 技术栈
- **开发框架**：微信小程序原生框架
- **数据请求**：使用wx.request API进行数据请求
- **本地存储**：使用wx.setStorageSync和wx.getStorageSync API进行本地存储
- **UI设计**：使用微信小程序原生组件进行UI设计

## 使用方法
1. 下载微信开发者工具
2. 克隆或下载本项目代码
3. 打开微信开发者工具，导入本项目代码
4. 点击“编译”按钮，即可运行本项目

## 项目结构
```
mini-gank/
├── app.js              # 小程序入口文件
├── app.json            # 小程序配置文件
├── app.wxss            # 小程序全局样式文件
├── img/                 # 小程序图片资源文件夹
├── js/                  # 小程序JavaScript文件文件夹
│   ├── MockData.js     # 模拟数据文件
│   ├── PostData.js     # 发布数据文件
│   └── RequestData.js  # 请求数据文件
├── pages/               # 小程序页面文件夹
│   ├── about/           # 关于页面文件夹
│   ├── add/             # 添加页面文件夹
│   └── index/           # 首页文件夹
├── project.config.json  # 小程序项目配置文件
└── project.private.config.json  # 小程序私有配置文件
```

## API地址
感谢干货集中营提供的开放API：http://gank.io/api

## 项目截图
![image](http://www.chenjinxinlove.com/cdn/qiniu/ll.gif)
![image](http://www.chenjinxinlove.com/cdn/qiniu/1.jpg)
![image](http://www.chenjinxinlove.com/cdn/qiniu/2.jpg)
![image](http://www.chenjinxinlove.com/cdn/qiniu/3.jpg)
![image](http://www.chenjinxinlove.com/cdn/qiniu/4.jpg)
