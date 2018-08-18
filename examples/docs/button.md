<style>
  .demo-box.demo-button {
    .m-row {
      margin-bottom: 20px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    .m-button + .m-button {
      margin-left: 10px;
    }
    .m-button-group {
      .m-button + .m-button {
        margin-left: 0;
      }

      & + .m-button-group {
        margin-left: 10px;
      }
    }
  }
</style>

## Button 按钮
常用的操作按钮。

### 基础用法

基础的按钮用法。

:::demo 使用`type`、`plain`、`round`和`circle`属性来定义 Button 的样式。

```html
<m-row>
  <m-button>默认按钮</m-button>
  <m-button type="primary">主要按钮</m-button>
  <m-button type="success">成功按钮</m-button>
  <m-button type="info">信息按钮</m-button>
  <m-button type="warning">警告按钮</m-button>
  <m-button type="danger">危险按钮</m-button>
</m-row>

<m-row>
  <m-button plain>朴素按钮</m-button>
  <m-button type="primary" plain>主要按钮</m-button>
  <m-button type="success" plain>成功按钮</m-button>
  <m-button type="info" plain>信息按钮</m-button>
  <m-button type="warning" plain>警告按钮</m-button>
  <m-button type="danger" plain>危险按钮</m-button>
</m-row>

<m-row>
  <m-button round>圆角按钮</m-button>
  <m-button type="primary" round>主要按钮</m-button>
  <m-button type="success" round>成功按钮</m-button>
  <m-button type="info" round>信息按钮</m-button>
  <m-button type="warning" round>警告按钮</m-button>
  <m-button type="danger" round>危险按钮</m-button>
</m-row>

<m-row>
  <m-button icon="m-icon-search" circle></m-button>
  <m-button type="primary" icon="m-icon-edit" circle></m-button>
  <m-button type="success" icon="m-icon-check" circle></m-button>
  <m-button type="info" icon="m-icon-message" circle></m-button>
  <m-button type="warning" icon="m-icon-star-off" circle></m-button>
  <m-button type="danger" icon="m-icon-delete" circle></m-button>
</m-row>
```
:::

### 禁用状态

按钮不可用状态。

:::demo 你可以使用`disabled`属性来定义按钮是否可用，它接受一个`Boolean`值。

```html
<m-row>
  <m-button disabled>默认按钮</m-button>
  <m-button type="primary" disabled>主要按钮</m-button>
  <m-button type="success" disabled>成功按钮</m-button>
  <m-button type="info" disabled>信息按钮</m-button>
  <m-button type="warning" disabled>警告按钮</m-button>
  <m-button type="danger" disabled>危险按钮</m-button>
</m-row>

<m-row>
  <m-button plain disabled>朴素按钮</m-button>
  <m-button type="primary" plain disabled>主要按钮</m-button>
  <m-button type="success" plain disabled>成功按钮</m-button>
  <m-button type="info" plain disabled>信息按钮</m-button>
  <m-button type="warning" plain disabled>警告按钮</m-button>
  <m-button type="danger" plain disabled>危险按钮</m-button>
</m-row>
```
:::

### 文字按钮

没有边框和背景色的按钮。

:::demo
```html
<m-button type="text">文字按钮</m-button>
<m-button type="text" disabled>文字按钮</m-button>
```
:::

### 图标按钮

带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。

:::demo 设置`icon`属性即可，icon 的列表可以参考 Element 的 icon 组件，也可以设置在文字右边的 icon ，只要使用`i`标签即可，可以使用自定义图标。

```html
<m-button type="primary" icon="m-icon-edit"></m-button>
<m-button type="primary" icon="m-icon-share"></m-button>
<m-button type="primary" icon="m-icon-delete"></m-button>
<m-button type="primary" icon="m-icon-search">搜索</m-button>
<m-button type="primary">上传<i class="m-icon-upload m-icon--right"></i></m-button>
```
:::

### 按钮组

以按钮组的方式出现，常用于多项类似操作。

:::demo 使用`<m-button-group>`标签来嵌套你的按钮。

```html
<m-button-group>
  <m-button type="primary" icon="m-icon-arrow-left">上一页</m-button>
  <m-button type="primary">下一页<i class="m-icon-arrow-right m-icon--right"></i></m-button>
</m-button-group>
<m-button-group>
  <m-button type="primary" icon="m-icon-edit"></m-button>
  <m-button type="primary" icon="m-icon-share"></m-button>
  <m-button type="primary" icon="m-icon-delete"></m-button>
</m-button-group>
```
:::

### 加载中

点击按钮后进行数据加载操作，在按钮上显示加载状态。

:::demo 要设置为 loading 状态，只要设置`loading`属性为`true`即可。

```html
<m-button type="primary" :loading="true">加载中</m-button>
```
:::

### 不同尺寸

Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

:::demo 额外的尺寸：`medium`、`small`、`mini`，通过设置`size`属性来配置它们。

```html
<m-row>
  <m-button>默认按钮</m-button>
  <m-button size="medium">中等按钮</m-button>
  <m-button size="small">小型按钮</m-button>
  <m-button size="mini">超小按钮</m-button>
</m-row>
<m-row>
  <m-button round>默认按钮</m-button>
  <m-button size="medium" round>中等按钮</m-button>
  <m-button size="small" round>小型按钮</m-button>
  <m-button size="mini" round>超小按钮</m-button>
</m-row>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |   medium / small / mini            |    —     |
| type     | 类型   | string    |   primary / success / warning / danger / info / text |     —    |
| plain     | 是否朴素按钮   | boolean    | — | false   |
| round     | 是否圆角按钮   | boolean    | — | false   |
| circle     | 是否圆形按钮   | boolean    | — | false   |
| loading     | 是否加载中状态   | boolean    | — | false   |
| disabled  | 是否禁用状态    | boolean   | —   | false   |
| icon  | 图标类名 | string   |  —  |  —  |
| autofocus  | 是否默认聚焦 | boolean   |  —  |  false  |
| native-type | 原生 type 属性 | string | button / submit / reset | button |
