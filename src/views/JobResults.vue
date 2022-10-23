<template>
  <div class="flex flex-row flex-nowrap w-full">
    <JobsSidebar />
    <JobListings />
  </div>
</template>

<script setup>
import JobsSidebar from '@/components/JobResults/JobsSidebar.vue';
import JobListings from '@/components/JobResults/JobListings.vue';
</script>
