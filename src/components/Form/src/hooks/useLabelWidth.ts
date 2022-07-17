/*
 * @Author: ypc
 * @Date: 2022-06-01 09:43:49
 * @LastEditors: ypc
 * @LastEditTime: 2022-07-17 21:57:50
 * @Description: file content
 * @FilePath: \gkestor-web-admin\src\components\Form\src\hooks\useLabelWidth.ts
 */
import type { Ref } from 'vue';
import type { FormProps, FormSchema } from '../types/form';

import { computed, unref } from 'vue';
import { isNumber } from '/@/utils/is';
import { getTextWidth } from '../helper';

export function useItemLabelWidth(schemaItemRef: Ref<FormSchema>, propsRef: Ref<FormProps>) {
  return computed(() => {
    const schemaItem = unref(schemaItemRef);
    const { labelCol = {}, wrapperCol = {} } = schemaItem.itemProps || {};
    const { labelWidth, disabledLabelWidth, label } = schemaItem;
    // component, label;
    // console.log('++++++++++++++++++++++++++', labelWidth);

    const {
      labelWidth: globalLabelWidth,
      labelCol: globalLabelCol,
      wrapperCol: globWrapperCol,
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

    let wrapperCol_width = width;
    if (width !== 'auto') {
      if (width === 'searchForm') {
        wrapperCol_width = getTextWidth(label + ': ', '14px Arial') + 'px';
      } else {
        wrapperCol_width = width || '110px';
      }
    }

    return {
      wrapperCol: {
        style: {
          width: width === 'auto' ? 'auto' : `calc(100% - ${wrapperCol_width})`,
        },
        ...wrapCol,
      },
      labelCol: {
        style: { width: width === 'auto' ? 'auto' : wrapperCol_width },
        flex: 'none',
        ...col,
      },
      globalLabelWidth: width,
    };
  });
}
