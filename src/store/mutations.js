import {
  ADD_SELECTED_ORGS,
  ADD_SELECTED_JOB_TYPES,
  LOGIN_USER,
  RECIEVE_JOBS,
} from '@/store/constants';

const mutations = {
  [LOGIN_USER](state) {
    state.isLoggedIn = true;
  },
  [RECIEVE_JOBS](state, jobs) {
    state.jobs = jobs;
  },
  [ADD_SELECTED_ORGS](state, organizations) {
    state.selectedOrgs = organizations;
  },
  [ADD_SELECTED_JOB_TYPES](state, jobTypes) {
    state.selectedJobTypes = jobTypes;
  },
};

export default mutations;
