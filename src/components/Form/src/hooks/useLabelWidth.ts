/*
 * @Author: ypc
 * @Date: 2022-07-17 13:29:14
 * @LastEditors: ypc
 * @LastEditTime: 2022-07-17 19:27:14
 * @Description: file content
 * @FilePath: \gkestor-web-admin\src\components\Form\src\hooks\useLabelWidth.ts
 */
import type { Ref } from 'vue';
import { computed, unref } from 'vue';
import type { FormProps, FormSchema } from '../types/form';
import { isNumber } from '/@/utils/is';

export function useItemLabelWidth(schemaItemRef: Ref<FormSchema>, propsRef: Ref<FormProps>) {
  return computed(() => {
    const schemaItem = unref(schemaItemRef);
    const { labelCol = {}, wrapperCol = {} } = schemaItem.itemProps || {};
    const { labelWidth, disabledLabelWidth } = schemaItem;

    const {
      labelWidth: globalLabelWidth,
      labelCol: globalLabelCol,
      wrapperCol: globWrapperCol,
      layout,
    } = unref(propsRef);

    // If labelWidth is set globally, all items setting
    if ((!globalLabelWidth && !labelWidth && !globalLabelCol) || disabledLabelWidth) {
      labelCol.style = {
        textAlign: 'left',
      };
      return { labelCol, wrapperCol };
    }
    let width = labelWidth || globalLabelWidth;
    const col = { ...globalLabelCol, ...labelCol };
    const wrapCol = { ...globWrapperCol, ...wrapperCol };

    if (width) {
      width = isNumber(width) ? `${width}px` : width;
    }

    const labelCol_width = width === 'searchForm' ? 'auto' : width;
    const wrapperCol_style =
      width === 'searchForm'
        ? { flex: 1, 'margin-right': '20px' }
        : { width: layout === 'vertical' ? '100%' : `calc(100% - ${width})` };

    return {
      labelCol: { style: { width: labelCol_width }, ...col },
      wrapperCol: {
        style: wrapperCol_style,
        ...wrapCol,
      },
    };
  });
}
