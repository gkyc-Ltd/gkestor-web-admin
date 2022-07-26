<!--
 * @Author: ypc
 * @Date: 2022-07-18 11:13:00
 * @LastEditors: ypc
 * @LastEditTime: 2022-07-26 17:12:41
 * @Description: file content
 * @FilePath: \gkestor-web-admin\src\components\Custom\Empty\index.vue
-->
<template>
  <Empty :image="simpleImage" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Empty } from 'ant-design-vue';
  export default defineComponent({
    name: 'AEmpty',
    components: { Empty },
    setup() {
      return {
        simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      };
    },
  });
</script>
