<template>
  <main class="flex-auto p-8 bg-brand-gray-2">
    <ol>
      <JobListing v-for="job in jobs" :key="job.id" :job="job" data-test="job-listing" />
    </ol>
  </main>
</template>

<script>
import axios from "axios";
import JobListing from "@/components/JobResults/JobListing.vue";

export default {
  name: "JobListings",
  components: { JobListing },
  data() {
    return {
      jobs: [],
    };
  },
  async mounted() {
    const res = await axios.get("http://localhost:3000/jobs");
    this.jobs = res.data;
  },
};
</script>