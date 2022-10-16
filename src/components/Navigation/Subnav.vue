<template>
  <div class="w-full h-16 bg-white border-b border-solid border-brand-gray-1">
    <div class="flex items-center h-full px-8">
      <div v-if="onJobResultsPage" data-test="job-count">
        <font-awesome-icon class="mr-3" :icon="['fas', 'search']" />
        <span
          ><span class="text-brand-green-1">{{
            FILTERED_JOBS_BY_ORGS.length
          }}</span>
          jobs matched</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { FILTERED_JOBS_BY_ORGS } from '@/store/constants';
import { mapGetters } from 'vuex';

export default {
  name: 'Subnav',
  computed: {
    onJobResultsPage() {
      return this.$route.name === 'JobResults';
    },
    ...mapGetters([FILTERED_JOBS_BY_ORGS]),
  },
};
</script>
