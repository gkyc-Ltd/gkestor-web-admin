## 样本标注

### 包管理器 pnpm

####安装

通过 npm

```bash
npm install -g pnpm
```

升级

```bas
pnpm add -g pnpm
```

命令行

| npm 命令        | pnpm 等效                                        |
| --------------- | ------------------------------------------------ |
| `npm install`   | [`pnpm install`](https://pnpm.io/zh/cli/install) |
| `npm i <pkg>`   | [`pnpm add <pkg>`]                               |
| `npm run <cmd>` | [`pnpm <cmd>`]                                   |

### 原则

1.开源复合组件不要破坏性的更改

### 常见问题

| 问题 | 解决方案 |  |
| --- | --- | --- |
| **nodejs 版本不匹配** | nodejs 统一使用 v16.13.0，开发环境包管理器统一使用 pnpm |  |
| multipleTab 关闭时无法缓存路由 | 手动在页面路由回调中调用 tabStore 的 action 将该页面加入缓存列表 |  |
| svg 图标存在底色 | svg 分文件中将带有色值的 fill 属性的属性值修改为 currentColor |  |
| vue watch 无法监听数据变动 | 配置属性 {deep:true} |
| 开发中页面刷新 | 观察控制台，是否出现 vite 相关依赖更新，刷新页面 `vite dependencies updated reloading page` ，将该依赖加入 `main.ts` 的对是否 dev 环境的判断中 |  |
| 文件夹大小写重命名 | 出现重名文件夹只修改大小写的情况时应使用`git mv casesensitive tmp` 再`git mv tmp CaseSensitive` | [相关](https://stackoverflow.com/questions/11183788/in-a-git-repository-how-to-properly-rename-a-directory) |
| debugger 行数不准确 | chrome devtool-setting-workspace 将当前项目添加到工作区中 |  |

### 组件改动

| 组件       | 改动                                      |     |
| ---------- | ----------------------------------------- | --- |
| ApiSelect  | valueField 为'gke-JSON'时选项值为整个对象 |     |
| BasicModal | title:false 隐藏头部                      |

### 路由

#### 配置

项目路由配置存放于 `src/router/routes` 下面。 `src/router/routes/modules` 用于存放路由模块，在该目录下的文件会自动注册。

在 `src/router/routes/modules` 内的 .ts 文件会被视为一个路由模块。其中 [Meta 配置项说明](https://vvbin.cn/doc-next/guide/router.html#meta-%E9%85%8D%E7%BD%AE%E8%AF%B4%E6%98%8E)

以结果管理示例

```typeScript
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const resultRoute: AppRouteModule = {
  path: '/resultManagement',
  name: 'resultManagement',
  component: LAYOUT,
  redirect: '/resultManagement/resultList',
  meta: {
    title: '结果管理',
    hideChildrenInMenu: false,
    icon: '结果管理|svg',
    pid: 0,
    orderNo: 30,
    id: 3,
  },
  children: [
    {
      path: 'resultList',
      name: 'ResultList',
      component: () => import('/@/views/resultManagement/resultList/index.vue'),
      meta: {
        hideBreadcrumb: true,
        title: '样本清单',
        // currentActiveMenu: '/dashboard',
        icon: '样本列表|svg',
        id: 14,
      },
    },
  ],
};

export default resultRoute;
```

`meta` 中的 `id` 对应后端数据库菜单 `id`，用于对应前端路由，一旦后端修改，前端需对应修改。

#### 缓存

开启缓存有 3 个条件

1. 在 [src/settings/projectSetting.ts](https://github.com/anncwb/vue-vben-admin/tree/main/src/settings/projectSetting.ts) 内将`openKeepAlive` 设置为 `true`
2. 路由设置 `name`，且**不能重复**
3. 路由对应的组件加上 `name`，与路由设置的 `name` 保持一致

关闭某页面缓存

`router.meta` 下配置

```typescript
export interface RouteMeta {
  // 是否忽略KeepAlive缓存
  ignoreKeepAlive?: boolean;
}
```

### 菜单

`src\settings\projectSetting.ts` 中 `permissionMode` 路由模式设为 `PermissionModeEnum.ROUTE_MAPPING` 前端路由时，路由会自动转换成左侧菜单。不需要转换的路由在 `meta` 中单独设置 `hideMenu: false ` 。

### 接口封装

接口统一存放于 `src/api/` 下面管理

实例：

```typescript
import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel } from './model/userModel';

enum Api {
  Login = '/login',
}

export function loginApi(params: LoginParams) {
  return defHttp.request<LoginResultModel>({
    url: Api.Login,
    method: 'POST',
    params,
  });
}
```

`axios` 统一返回处理和代理封装 `src\utils\http\axios\index.ts`

实例：

```typescript
export const stampHttp = createAxios({
  requestOptions: {
    apiUrl: '/stamp-api',
    urlPrefix: '',
  },
});
```

环境配置文件 `.env` 中

```ini
VITE_PROXY = [["/stamp-api","http://192.168.12.1:15014"]]
```

### 样式

默认使用 less 作为预处理语言，项目中使用的通用样式，都存放于 [src/design/](https://github.com/anncwb/vue-vben-admin/tree/main/src/design) 下面。

```
.
├── ant # ant design 一些样式覆盖
├── color.less # 颜色
├── index.less # 入口
├── public.less # 公共类
├── theme.less # 主题相关
├── config.less  # 每个组件都会自动引入样式
├── transition # 动画相关
└── var # 变量
```

全局注入

config.less 这个文件会被全局注入到所有文件

#### tailwindcss

项目中引用到了 [tailwindcss](https://tailwindcss.com/docs), 具体可以见文件使用说明。

语法如下:

```html
<div class="relative w-full h-full px-4"></div>
```

#### 深度选择器

使用 scoped 后，父组件的样式将不会渗透到子组件中，使用以下方式解决

```css
<style scoped>
  /* 深度选择器 （已弃用） */
  ::v-deep(.foo) {
  }
  /* 缩写 （推荐）  */
  :deep(.foo) {
  }

  /* targeting slot content */
  ::v-slotted(.foo) {
  }
  /* shorthand */
  :slotted(.foo) {
  }

  /* one-off global rule */
  ::v-global(.foo) {
  }
  /* shorthand */
  :global(.foo) {
  }
</style>
```

### 单文件组件`<script setup>`

优势:

- 更少的样板内容，更简洁的代码。
- 能够使用纯 Typescript 声明 props 和抛出事件。
- 更好的运行时性能 (其模板会被编译成与其同一作用域的渲染函数，没有任何的中间代理)。
- 更好的 IDE 类型推断性能 (减少语言服务器从代码中抽离类型的工作)。

#### 基本语法

```vue
<script setup>
  console.log('hello script setup');
</script>
```

##### 顶层的绑定会被暴露给模板

当使用 `<script setup>` 的时候，任何在 `<script setup>` 声明的顶层的绑定 (包括变量，函数声明，以及 import 引入的内容) 都能在模板中直接使用：

```vue
<script setup>
  // 变量
  const msg = 'Hello!';

  // 函数
  function log() {
    console.log(msg);
  }
</script>

<template>
  <div @click="log">{{ msg }}</div>
</template>
```

import 导入的内容也会以同样的方式暴露。意味着可以在模板表达式中直接使用导入的 helper 函数，并不需要通过 `methods` 选项来暴露它：

```vue
<script setup>
  import { capitalize } from './helpers';
</script>

<template>
  <div>{{ capitalize('hello') }}</div>
</template>
```

#### 使用组件

##### 命名空间组件

可以使用带点的组件标记，例如 `<Foo.Bar>` 来引用嵌套在对象属性中的组件。这在需要从单个文件中导入多个组件的时候非常有用：

```vue
<script setup>
  import * as Form from './form-components';
</script>

<template>
  <Form.Input>
    <Form.Label>label</Form.Label>
  </Form.Input>
</template>
```

#### `defineProps` 和 `defineEmits`

在 `<script setup>` 中必须使用 `defineProps` 和 `defineEmits` API 来声明 `props` 和 `emits` ，它们具备完整的类型推断并且在 `<script setup>` 中是直接可用的：

```vue
<script setup>
  const props = defineProps({
    foo: String,
  });

  const emit = defineEmits(['change', 'delete']);
  // setup code
</script>
```

- `defineProps` 和 `defineEmits` 都是只在 `<script setup>` 中才能使用的**编译器宏**。他们不需要导入且会随着 `<script setup>` 处理过程一同被编译掉。
- `defineProps` 接收与 [`props` 选项](https://v3.cn.vuejs.org/api/options-data.html#props)相同的值，`defineEmits` 也接收 [`emits` 选项](https://v3.cn.vuejs.org/api/options-data.html#emits)相同的值。
- `defineProps` 和 `defineEmits` 在选项传入后，会提供恰当的类型推断。
- 传入到 `defineProps` 和 `defineEmits` 的选项会从 setup 中提升到模块的范围。因此，传入的选项不能引用在 setup 范围中声明的局部变量。这样做会引起编译错误。但是，它*可以*引用导入的绑定，因为它们也在模块范围内。

#### 与普通的 `<script>` 一起使用

`<script setup>` 可以和 `<script>` 一起使用

- 无法在 `<script setup>` 声明的选项，例如 `inheritAttrs` 或通过插件启用的自定义的选项。
- 声明命名导出。
- 运行副作用或者创建只需要执行一次的对象。

```vue
<script>
  // 普通 <script>, 在模块范围下执行(只执行一次)
  runSideEffectOnce();

  // 声明额外的选项
  export default {
    name: 'ComponentName',
    inheritAttrs: false,
    customOptions: {},
  };
</script>

<script setup>
  // 在 setup() 作用域中执行 (对每个实例皆如此)
</script>
```

### 风格指南

#### 组件名为多个单词

**组件名应该始终由多个单词组成，除了根组件 `App`，以及 `<transition>`、`<component>` 之类的 Vue 内置组件。**

这样做可以避免与现有以及未来的 HTML 元素[产生冲突](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name)，因为所有的 HTML 元素名称都是单个单词的。

#### Prop 定义

**Prop 定义应尽量详细**

在提交的代码中，prop 的定义应该尽量详细，至少指定其类型。

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中
