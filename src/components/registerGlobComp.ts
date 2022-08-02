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

// import { BasicForm } from '/@/components/Form/index';
// import { BasicTable } from '/@/components/Table/index';
import { BasicModal } from '/@/components/Modal/index';

const compList = [
  // BasicForm,
  // BasicTable,
  BasicModal,
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

export function registerGlobComp(app: App) {
  compList.forEach((comp) => {
    app.component(comp.name || comp.displayName, comp);
  });

  app.use(Button).use(Empty);
}
