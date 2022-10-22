<template>
  <Accordion header="Job Types">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="jobType in uniqueJobs" :key="jobType" class="w-1/2 h-8">
            <input
              :id="jobType"
              v-model="selectedJobTypes"
              :value="jobType"
              type="checkbox"
              class="mr-3"
              :data-test="jobType"
              @change="selectJobType"
            />
            <label :for="jobType" data-test="job-type">{{ jobType }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </Accordion>
</template>

<script setup>
import { useUniqueJobs } from '@/store/composables';
import Accordion from '@/components/Common/Accordion.vue';
import { ADD_SELECTED_JOB_TYPES } from '@/store/constants';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const selectedJobTypes = ref([]);
const uniqueJobs = useUniqueJobs();

const selectJobType = () => {
  store.commit(ADD_SELECTED_JOB_TYPES, selectedJobTypes.value);
  router.push({ name: 'JobResults' });
};
</script>
