<template>
  <div
    class="box-content relative overflow-hidden border-2 rounded-md cursor-pointer card hover:shadow-md hover:border-login hover:border-2"
  >
    <img class="w-full" :src="cover" alt="" />

    <div
      v-if="$slots.extra"
      class="absolute right-0 top-0 z-1 w-10.5 h-5.5 text-xs flex items-center justify-center text-white rounded-bl-sm rounded-tr-sm bg-green-555"
      :class="props.extraClass"
    >
      <slot name="extra"></slot>
    </div>
    <div
      v-if="$slots.tagLeft"
      class="absolute left-0 top-0 z-1 w-54px h-5.5 text-xs flex items-center justify-center text-white rounded-tl-sm rounded-br-sm"
      :style="{ backgroundColor: '#D87845' }"
      :class="props.tagLeftCls"
    >
      <slot name="tagLeft"></slot>
    </div>

    <div class="flex-grow p-3.5">
      <div class="mb-18px" :title="props.title">
        <Tooltip>
          <template #title>{{ props.title }}</template>
          <div class="sb truncate">{{ props.title }}</div>
        </Tooltip>
      </div>
      <div class="text-xs">
        <slot v-if="$slots.content" name="content"></slot>
        <template v-else>
          <div class="w-full p-0.5 flex justify-between text-xs">
            <span>编号: {{ props.content.sampleId }}</span>
          </div>
          <div class="w-full p-0.5 flex justify-between text-xs">
            <span>标注人员: {{ props.content.marker }}</span>
          </div>
          <div class="w-full p-0.5 flex items-center text-xs" :title="props.content.updateDate">
            <ClockCircleOutlined />
            <span class="whitespace-nowrap ml-1 truncate flex items-center">
              {{ props.content.updateDate }}
            </span>
          </div>
        </template>
      </div>

      <div
        @click="
          (e) => {
            e.stopPropagation();
          }
        "
      >
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { basicProps } from './props';
  import { ClockCircleOutlined } from '@ant-design/icons-vue';
  import { Tooltip } from 'ant-design-vue';
  import defaultimg from '/src/assets/images/默认图片.png';
  const props = defineProps(basicProps);

  const cover = computed(() => {
    return props.img ?? defaultimg;
  });
</script>
<style lang="less" scoped>
  .gk-card:hover {
    z-index: 1;
    cursor: pointer;
    border: 2px solid #178ee7;
  }

  .gkmain-tag {
    width: 64px;
    height: 22px;
    text-align: center;
    border-radius: 14px !important;
  }

  .gk-card {
    display: flex;
    flex-flow: column;
    flex-wrap: nowrap;
    width: 185px;
    height: 212px;
    border: 1px solid #dddfe4;
    border-radius: 4px !important;
  }

  .gk-card-head {
    position: relative;
    width: 100%;
    font-size: 14px;

    &-wrapper {
      display: flex;
      width: 100%;
      height: 36px;
      padding: 20px 12px 0;
      justify-content: space-between;
      align-items: center;
    }

    &-img {
      position: relative;
      height: 122px;

      &-tag {
        position: absolute;
        top: 10px;
        right: 2px;
      }
    }

    &-title {
      font-size: 16px;
      font-weight: 600;
    }
  }

  .gk-card-body {
    flex-grow: 1;
    width: 100%;
    padding: 12px;
    font-size: 12px;
    font-weight: 400;
    color: #666;
    box-sizing: border-box;
  }

  .gk-card-footer {
    width: 100%;
    padding: 0 12px;
    font-size: 14px;

    &-wrapper {
      display: flex;
      width: 100%;
      height: 36px;
      justify-content: space-between;
      align-items: center;
    }

    &-img {
      display: flex;
      height: 60px;
      justify-content: space-between;
      align-items: center;
    }

    &-title {
      font-size: 16px;
      font-weight: 600;
    }
  }

  .top_bg {
    position: absolute;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 55px;
    background: linear-gradient(180deg, #000 0%, rgb(0 0 0 / 0%) 0.1%);
  }

  .line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
</style>
