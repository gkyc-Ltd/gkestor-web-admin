<template>
  <Pagination
    v-if="isShow"
    showLessItems
    size="small"
    simple
    :pageSize="pageSize"
    :total="total"
    :show-total="(total) => `共 ${total} 条记录`"
    @change="showPageChange"
    @show-size-change="showSizeChange"
    show-size-changer
    show-quick-jumper
    :current="page"
    :pageSizeOptions="pageSizeOptions"
  />
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, watch, nextTick } from 'vue';
  import { Pagination } from 'ant-design-vue';
  import componentSetting from '/@/settings/componentSetting';
  const { table } = componentSetting;
  const { pageSizeOptions } = table;

  import { basicProps } from './props';

  export default defineComponent({
    name: 'Pagination2',
    components: {
      Pagination,
    },
    props: basicProps,
    setup(props: any, content: any) {
      console.log(props.total);

      watch(
        () => props.total,
        (count, prevCount) => {
          state.total = count;
          console.log(count, prevCount);
          /* ... */
        },
      );
      watch(
        () => props.page,
        (count, prevCount) => {
          state.page = count;
          console.log(count, prevCount);
          /* ... */
          state.isShow = false;
          nextTick(() => {
            state.isShow = true;
          });
        },
      );

      const state: any = reactive({
        total: Number(props.total) || 0, //总页数
        page: props.page || 1, //当前页码
        pageSize: props.pageSize || 10, //页尺寸
        pageSizeOptions: props.pageSizeOptions || pageSizeOptions, //页尺寸选项
        isShow: true,
      });

      function showPageChange(page, pageSize) {
        console.log(pageSize);
        state.page = page;
        content.emit('changePage', {
          page: state.page,
          pageSize: state.pageSize,
        });
      }

      function showSizeChange(current, size) {
        console.log(current);
        state.pageSize = size;
        content.emit('changePage', { page: 1, pageSize: state.pageSize });
      }

      return {
        ...toRefs(state),
        showPageChange,
        showSizeChange,
      };
    },
  });
</script>

<style lang="less" scoped>
  :deep(span.anticon:not(.app-iconify)) {
    color: white !important;
  }
</style>
