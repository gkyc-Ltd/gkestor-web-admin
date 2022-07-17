<template>
  <Empty :image="simpleImage" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Empty } from 'ant-design-vue';
  export default defineComponent({
    name: 'GkestorEmpty',
    components: { Empty },
    setup() {
      return {
        simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      };
    },
  });
</script>
