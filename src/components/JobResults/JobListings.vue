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

<script setup>
import JobListing from '@/components/JobResults/JobListing.vue';
import { FETCH_JOBS } from '@/store/constants';
import { useFilteredJobs } from '@/store/composables';
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';
import useCurrentPage from '@/composables/useCurrentPage';
import usePreviousAndNextPages from '@/composables/usePreviousAndNextPages';

const store = useStore();
const fetchJobs = () => store.dispatch(FETCH_JOBS);
onMounted(fetchJobs);

const filteredJobs = useFilteredJobs();

const currentPage = useCurrentPage();
const lastPage = computed(() => Math.ceil(filteredJobs.value.length / 10));

const { previousPage, nextPage } = usePreviousAndNextPages(
  currentPage,
  lastPage
);

const displayedJobs = computed(() => {
  const firstJobIndex = (currentPage.value - 1) * 10;
  const lastJobIndex = currentPage.value * 10;
  return filteredJobs.value.slice(firstJobIndex, lastJobIndex);
});
</script>
