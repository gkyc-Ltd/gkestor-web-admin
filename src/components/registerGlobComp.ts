/*
 * @Author: ypc
 * @Date: 2022-07-17 13:29:14
 * @LastEditors: ypc
 * @LastEditTime: 2022-08-02 14:33:22
 * @Description: file content
 * @FilePath: \gkestor-web-admin\src\components\registerGlobComp.ts
 */
import type { App } from 'vue';
import { Button } from './Button';
import { Icon } from './Icon';
import { Empty } from './Custom/Empty';
import CustomHeader from './Custom/CustomHeader';
import { Input, Layout, Select, List, Tooltip, Spin, Checkbox, Radio } from 'ant-design-vue';
import { DefineComponent } from '@vue/runtime-core';

const compList: DefineComponent[] = [
  CustomHeader,
  Icon,
  Input,
  Layout,
  Select,
  List,
  Tooltip,
  Spin,
  Checkbox,
  Radio,
];

export async function registerGlobComp(app: App) {
  // 解决全局组件国际无法使用问题，import写在外面会vben会先加载组件后加载国际化，所以import写在里面
  const { BasicForm } = await import('/@/components/Form/index');
  const { BasicModal } = await import('/@/components/Modal/index');
  const { BasicTable } = await import('/@/components/Table/index');
  compList.push(BasicForm);
  compList.push(BasicModal);
  compList.push(BasicTable);
  compList.forEach((comp) => {
    app.component(comp.name || comp.displayName, comp);
  });

  app.use(Button).use(Empty);
}
