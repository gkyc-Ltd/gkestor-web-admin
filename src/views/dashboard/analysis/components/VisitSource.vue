<!--
 * @Author: ypc
 * @Date: 2022-07-18 11:13:00
 * @LastEditors: ypc
 * @LastEditTime: 2022-08-01 16:02:40
 * @Description: file content
 * @FilePath: \gkestor-web-admin\src\views\dashboard\analysis\components\VisitSource.vue
-->
<template>
  <Card title="访问来源" :loading="loading" :bodyStyle="bodyStyle">
    <!-- <div class="flex w-full justify-around flex-wrap gap-2 h-max">
      <div
        class="w-5/12 h-20 bg-red-500 last:bg-yellow-400 last:mb-5"
        v-for="i in 9"
        :key="i"
      ></div>
    </div> -->

    <!-- <Row :gutter="[16, 16]">
      <Col v-for="i in 19" :key="i" class="w-5/12 h-20 bg-red-500" :span="6" />
    </Row> -->
    <div
      class="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 3xl:grid-cols-4 gap-4"
    >
      <div class="h-20 bg-primary last:bg-yellow-400" v-for="i in 9" :key="i"></div>
    </div>
  </Card>
</template>
<script lang="ts" setup>
  import { Ref, ref, watch } from 'vue';
  import { Card } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  const props = defineProps({
    loading: Boolean,
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '300px',
    },
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  const bodyStyle = ref({ overflow: 'auto', height: 'calc(100% - 58px)' });
  watch(
    () => props.loading,
    () => {
      if (props.loading) {
        return;
      }
      setOptions({
        tooltip: {
          trigger: 'item',
        },
        legend: {
          bottom: '1%',
          left: 'center',
        },
        series: [
          {
            color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '12',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: '搜索引擎' },
              { value: 735, name: '直接访问' },
              { value: 580, name: '邮件营销' },
              { value: 484, name: '联盟广告' },
            ],
            animationType: 'scale',
            animationEasing: 'exponentialInOut',
            animationDelay: function () {
              return Math.random() * 100;
            },
          },
        ],
      });
    },
    { immediate: true },
  );
</script>
