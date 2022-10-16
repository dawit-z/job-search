<template>
  <main class="flex-auto p-8 bg-brand-gray-2">
    <ol>
      <JobListing
        v-for="job in displayedJobs"
        :key="job.id"
        :job="job"
        data-test="job-listing"
      />
    </ol>

    <div class="mt-8 mx-auto">
      <div class="flex flex-row flex-nowrap">
        <p class="text-sm flex-grow">Page {{ currentPage }}</p>

        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            :to="{ name: 'JobResults', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            data-test="previous-page-link"
            >Previous</router-link
          >

          <router-link
            v-if="nextPage"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            data-test="next-page-link"
            >Next</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import JobListing from '@/components/JobResults/JobListing.vue';
import { FETCH_JOBS, FILTERED_JOBS_BY_ORGS } from '@/store';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'JobListings',
  components: { JobListing },
  computed: {
    ...mapGetters([FILTERED_JOBS_BY_ORGS]),
    currentPage() {
      const pageString = this.$route.query.page || '1';
      return Number.parseInt(pageString);
    },
    previousPage() {
      const previousPage = this.currentPage - 1;
      const firstPage = 1;
      return previousPage >= firstPage ? previousPage : undefined;
    },
    nextPage() {
      const nextPage = this.currentPage + 1;
      const lastPage = Math.ceil(this.FILTERED_JOBS_BY_ORGS.length / 10);
      return nextPage <= lastPage ? nextPage : undefined;
    },
    displayedJobs() {
      const firstJobIndex = (this.currentPage - 1) * 10;
      const lastJobIndex = this.currentPage * 10;
      return this.FILTERED_JOBS_BY_ORGS.slice(firstJobIndex, lastJobIndex);
    },
  },
  async mounted() {
    this.FETCH_JOBS();
  },
  methods: {
    ...mapActions([FETCH_JOBS]),
  },
};
</script>
