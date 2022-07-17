<!--
 * @Author: ypc
 * @Date: 2022-01-14 16:18:08
 * @LastEditors: ypc
 * @LastEditTime: 2022-05-26 11:52:56
 * @Description: file content
 * @FilePath: \a\src\components\Custom\CustomHeader\src\CustomHeader.vue
-->
<template lang="">
  <div :class="prefixCls" class="flex items-center justify-between h-min bg-white border-b">
    <div class="text-lg font-semibold leading-none my-20px">{{ getTitle }}</div>
    <slot name="headerRight"></slot>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { propTypes } from '/@/utils/propTypes';

  import { useDesign } from '/@/hooks/web/useDesign';
  import { useRouter } from 'vue-router';
  export default defineComponent({
    name: 'CustomHeader',
    props: {
      title: propTypes.string.def(''),
    },
    setup(props) {
      const router = useRouter();

      const getTitle = computed(() => {
        return props.title ? props.title : router.currentRoute.value.meta.title;
      });

      const { prefixCls } = useDesign('header');
      return {
        prefixCls,
        getTitle,
      };
    },
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-header';
  .@{prefix-cls} {
    border-color: @border-color-base;
  }

  .tabActive {
    font-size: 18px;
    color: @primary-color;
    border-bottom: 2px solid @primary-color;
  }
</style>
