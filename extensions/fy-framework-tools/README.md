# 项目简介

- FYFramework的基础工具。
- 将框架的配置添加的项目的配置中。
- 将框架源码添加到项目中。
- 生成资源的路径。
- 生成预制对应的脚本。



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

- 选择项目，找到fy-framework-tools，启动。



## 插件入口

- CocosCreator菜单-->扩展-->ForyunTools-->FY框架工具



## 插件面板

### 辅助

- 排除插件内的脚本，避免用vscode将插件里面的ts脚本也加入代码提示候选。
- 添加类型定义文件。

### 初始化框架

- 将框架拷贝到项目中。

### 资源路径生成器

- 生成资源路径的配置文件，便于框架可以通过资源名字就加载资源，而不需要输入资源路径。

- 为了简化资源加载，通过传入资源名，就可以快速加载资源，而不需要填写全路径，所以创建了该工具。

- 看编辑器控制台，提示”资源路径生成成功“则代表成功了。

- 生成的文件在Script/Config/ConfigRes.ts

- 资源加载方式：

- ```typescript
  (await FY.resource.load<Texture2D>('bomb_items_01')).width;
  (await FY.resource.loadPath<Texture2D>(ConfigRes.bomb_items_01)).width;
  ```

- 为了简化框架，加快开发进度，目前不考虑热更新和AssetBundle的封装，所以就直接粗暴的用resources加载资源了。

### 预制脚本生成器

- 为了简化和统一操作流程，通过工具，根据预制结构，生成对应的Model，View，Controller，其中View不能修改，涉及到View的业务逻辑，在Controller中实现，涉及需要额外存储的数据，放在Model中。

- 使用方式，点击菜单栏，扩展->ForyunTools->1.FY框架工具->构建预制代码

- 预制的结构，参考文档[Prefab结构解析](../README/Prefab结构解析.md)

- 在编辑预制时，需要用代码访问的节点，在节点名字的前后添加_，例如

  ```
  P_UI_UITips(Node)
  ->Widget
  -->Bg
  -->_Tips_
  
  _Tips_就是需要用代码访问的节点
  ```

- 对应生成的脚本UITips.ts，UITipsView.ts，UITipsModel.ts。

- 假设`_Tips_`上有组件(Node,cc.UITransform,cc.Label)，那么UITipsView.ts会自动生成如下代码：

  ```typescript
  import { _decorator, find, Node, UITransform, Label } from 'cc';
  import { FYUIViewBase } from '../../../Base/FYFramework/UI/FYUIViewBase';
  const { ccclass, property } = _decorator;
  
  @ccclass('UITipsView')
  export class UITipsView extends FYUIViewBase {
  
      public cTips: Node;
      public cTipsUITransform: UITransform;
      public cTipsLabel: Label;
      
      public onLoad() {
          this.initComponent();
      } 
  
      private initComponent() {
          this.cTips = find('Widget/_Tips_', this.node);
          this.cTipsUITransform = this.cTips.getComponent(UITransform);
          this.cTipsLabel = this.cTips.getComponent(Label);
      }
  }
  ```

- 而UITips.ts中会绑定Model和View

  ```typescript
  import { _decorator } from "cc";
  import { FYUIControllerBase } from '../../../Base/FYFramework/UI/FYUIControllerBase';
  const { ccclass, property } = _decorator;
  
  @ccclass('UITips')
  export class UITips extends FYUIControllerBase {
      public model: UITipsModel;
      public view: UITipsView;
  }
  ```

- 如果想给`_Tips_`上的Label组件赋值，可以如下操作：

  ```typescript
  (await FY.ui.open(UITips)).view.cTipsLabel.string = 'Hello';
  ```

- 如果想实现Model数值变化，就自动刷新对应的View组件，可以通过如下放下实现：

  ```typescript
  this.emit(FYEnum.Event.ChangeViewValue, View中要操作的对象, async (View中要操作的对象: Sprite) => { });
  ```

  举个实例：

  ```typescript
      private _blockValue: number = 0;
      public get blockValue(): number {
          return this._blockValue;
      }
      /** 方块的数值 */
      public set blockValue(v: number) {
          if (this._blockValue === v || v > GConst2048Go.BLOCK_VALUE_MAX || v < GConst2048Go.BLOCK_VALUE_MIN) {
              return;
          }
          this._blockValue = v;
          // 改变数值，和颜色
          this.emit(FYEnum.Event.ChangeViewValue, 'cValueLabel', (cValueLabel: Label) => {
              cValueLabel.string = this._blockValue.toString();
              let index = Math.log2(this._blockValue) - 1;
              let color = new Color().fromHEX(ConfigColor[index % ConfigColor.length]);
              cValueLabel.color = color;
          });
          // 改变方块
          this.emit(FYEnum.Event.ChangeViewValue, 'cNodeSprite', async (cNodeSprite: Sprite) => {
              let index = Math.log2(this._blockValue) - 1;
              cNodeSprite.spriteFrame = await FY.resource.load<SpriteFrame>(`T_Block_${index % ConfigColor.length + 1}`, 'spriteFrame');
          });
      }
  ```

  上面这个例子，想实现的效果是，当blockValue发生变化时，对应的View的cValueLabel的文本和颜色发生改变，cNodeSprite的图片发生改变。

### 样本项目

- 为了用户快速熟悉框架的用法，构建的样本项目，项目项目提供了一些简易的通用的模块，比如，提示框，确认框。同时，也做好了框架的初始化工作，便于拿来即用。

- 使用方式，点击菜单栏，扩展->ForyunTools->1.FY框架工具->初始化样本项目。



# 注意事项

- 需要自动生成脚本的预制，根节点一定要带cc.UITransform，不然根节点的组件会获取失败。
