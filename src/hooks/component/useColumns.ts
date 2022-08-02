import { h } from 'vue';
import { BasicColumn } from '/@/components/Table';
import { Tooltip } from 'ant-design-vue';
import { isBoolean } from '/@/utils/is';
import copy from '/@/utils/copy';

export function useColumns(columns: BasicColumn[]): BasicColumn[] {
  columns.forEach((column) => {
    if (isBoolean(column.tooltip) && column.tooltip) {
      column.customRender = ({ record }) => {
        return h(
          Tooltip,
          {
            title: h(
              'div',
              {
                onClick: copy,
                class: 'tag-read cursor-pointer',
                'data-clipboard-text': record[column.dataIndex!],
              },
              record[column.dataIndex!],
            ),
            placement: column.align === 'left' ? 'topLeft' : 'top',
          },
          {
            default: () =>
              h(
                'div',
                {
                  class: [column.className, 'truncate'],
                },
                record[column.dataIndex!],
              ),
          },
        );
      };
    }
  });
  return columns;
}
