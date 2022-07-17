/*
 * @Author: ypc
 * @Date: 2022-07-17 13:29:14
 * @LastEditors: ypc
 * @LastEditTime: 2022-07-17 23:37:26
 * @Description: file content
 * @FilePath: \gkestor-web-admin\src\components\registerGlobComp.ts
 */
import type { App } from 'vue';
import { Button } from './Button';
import { Icon } from './Icon';
import { GkestorEmpty } from './Custom/Empty';
import CustomHeader from './Custom/CustomHeader';
import {
  // Need
  Button as AntButton,
  Input,
  Layout,
} from 'ant-design-vue';

const compList = [AntButton.Group, CustomHeader, Icon, GkestorEmpty];

export function registerGlobComp(app: App) {
  compList.forEach((comp) => {
    app.component(comp.name || comp.displayName, comp);
  });

  app.use(Input).use(Button).use(Layout);
}
