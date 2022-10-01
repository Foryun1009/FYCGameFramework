# 项目简介

- Excel转换工具，将xlsx文件转换成二进制文件，并生成对应的解析脚本。

- 将xlsx转成Json结构后，再用HPack压缩算法，压缩Json结构，再用deflate将Json压缩成二进制。二次压缩后，二进制/原始Json，约等于，10%。



## 开发环境

- Node.js

- CocosCreator3.3.0



## 安装

```bash
# 安装依赖模块
npm install
# 构建
npm run build
```



## 备注

- 考虑到依赖项可能不好下载，所以保留了node_modules，所以即使不执行安装命令也可以直接运行。



## 插件启动

- CocosCreator菜单-->扩展-->扩展管理器

- 选择项目，找到fy-excel-tools，启动。



## 插件入口

- CocosCreator菜单-->扩展-->ForyunTools-->Excel转换工具



## 插件面板

- 配置表所在路径
  - xlsx文件所在目录。

- 数据文件输出目录
  - xlsx转换的二进制数据文件保存目录。

- 脚本文件输出目录
  - 解析二进制数据文件的脚本文件保存目录。

- 构建按钮
  - 开始转换。

- 构建进度
  - 转成进度和日志。



## 配置表格式

| ID   | Name | Desc |
| ---- | ---- | ---- |
| 100  | 名字 | 描述 |



## 使用方法

- 代码中获取配置表数据方式：

  ```typescript
  // 假设有个配置表名叫Accessories
  // 生成的脚本则名为CfgAccessories.ts
  // 获取配置表数据的方法有两种，如下：
  async start() {
    	// 按照配置表的行数获取
      let desc = (await CfgAccessories.getData())[0].szUpDesc;
    	// 按照指定关键字的值获取
      let name = (await CfgAccessories.getData('ID'))[100].szName;
  }
  ```

  

