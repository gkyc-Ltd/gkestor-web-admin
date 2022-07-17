import type { PropType } from 'vue';

import { propTypes } from '/@/utils/propTypes';
import type { ContextMenuItem } from '/@/components/ContextMenu';

export const basicProps = {
  title: propTypes.any,
  content: {
    type: Object as PropType<Recordable>,
    default: null,
  },
  contextMenuItems: {
    type: Array as PropType<ContextMenuItem[]>,
  },
  img: propTypes.string,
  tag: propTypes.string,
  extraClass: propTypes.object,
  tagLeftCls: propTypes.object,
};
