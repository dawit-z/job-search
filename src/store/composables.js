import { computed } from 'vue';
import { useStore } from 'vuex';

import {
  FILTERED_JOBS,
  UNIQUE_JOB_TYPES,
  UNIQUE_ORGANIZATIONS,
} from '@/store/constants';

export const useFilteredJobs = () => {
  const store = useStore();
  return computed(() => store.getters[FILTERED_JOBS]);
};

export const useUniqueJobs = () => {
  const store = useStore();
  return computed(() => store.getters[UNIQUE_JOB_TYPES]);
};

export const useUniqueOrgs = () => {
  const store = useStore();
  return computed(() => store.getters[UNIQUE_ORGANIZATIONS]);
};
