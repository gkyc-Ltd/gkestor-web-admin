<template>
  <div class="p-4 flex flex-nowrap flex-col justify-between" style="height: calc(100vh - 85px)">
    <GrowCard :loading="loading" class="enter-y w-full h-0 flex-1" />
    <!-- <SiteAnalysis class="!my-4 enter-y" :loading="loading" /> -->
    <div class="md:flex enter-y flex-auto h-0 mt-5">
      <VisitRadar class="md:w-1/3 w-full" :loading="loading" />
      <VisitSource class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="loading" />
      <!-- <SalesProductPie class="md:w-1/3 w-full" :loading="loading" /> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import GrowCard from './components/GrowCard.vue';
  // import SiteAnalysis from './components/SiteAnalysis.vue';
  import VisitSource from './components/VisitSource.vue';
  import VisitRadar from './components/VisitRadar.vue';
  //import SalesProductPie from './components/SalesProductPie.vue';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
