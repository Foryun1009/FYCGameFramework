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
| number   | string | string |
| 编号   | 名字 | 描述 |
| 100  | 倪浩 | 很好 |

- 第一行是配置表的key
- 第二行是key对应值的类型
- 第三行是key的说明

## 使用方法

- 代码中获取配置表数据方式：

  ```typescript
  // 假设有个配置表名叫Accessories
  // 生成的脚本则名为CfgAccessories.ts
  // 获取配置表数据的方法有两种，如下：
  async start() {
    	// 按照配置表的行数获取
      let desc = (await CfgAccessories.getData())[0].szUpDesc;
    	// 按照指定关键字进行索引，根据关键字的值，取出对应的行，再根据行取出对应的列
      // 这个方法适用于Key对应的行唯一的情况
      let name = (await CfgAccessories.getData('ID'))[100].szName;
      // 按照指定关键字进行索引，根据关键字的值，取出对应的数组，再根据数组的下标取出对应的列
      // 这个方法适用于Key对应的行不唯一的情况
      let name = (await CfgAccessories.getDatas('Type'))[1][0].szName;
  }
  ```

  

## 注意

- Excel表格所有的工作表都不能有空白或者不符合配置表格式的数据存在，不然会有各种异常。
- 一般新建的Excel文件默认创建了三个空白的工作表，请用户自行注意。
- Excel文件名不要取ResPath，避免冲突。
- 如果Excel表格不只一个工作表，那么每一个工作表都会生成对应的配置文件和脚本文件，例如GameData.xlsx有Sheet1，Sheet2两个工作表，那么就会生成,CFG_GameData.bin，CfgGameData.ts，CFG_GameData_Sheet2.bin，CfgGameData_Sheet2.ts，除了第一个工作表，其余的工作表生成的配置和脚本都会以"_" + 工作表名字的方式命名