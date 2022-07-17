import { computed, unref } from 'vue';
import { isNumber } from '/@/utils/is';

export function useCardMaxHeight(maxHeight: string | number) {
  return computed(() => {
    let cardMaxHeight = unref(maxHeight);
    if (cardMaxHeight) {
      cardMaxHeight = isNumber(cardMaxHeight) ? `${cardMaxHeight}px` : cardMaxHeight;
    } else {
      cardMaxHeight = 'auto';
    }

    return {
      cardMaxHeight: `height:${cardMaxHeight}`,
    };
  });
}
