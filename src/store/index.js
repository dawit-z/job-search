import getJobs from '@/api/getJobs';
import { createStore } from 'vuex';

export const LOGIN_USER = 'LOGIN_USER';
export const RECIEVE_JOBS = 'RECIEVE_JOBS';
export const ADD_SELECTED_ORGS = 'ADD_SELECTED_ORGS';
export const FETCH_JOBS = 'FETCH_JOBS';
export const FILTERED_JOBS_BY_ORGS = 'FILTERED_JOBS_BY_ORGS';
export const UNIQUE_ORGANIZATIONS = 'UNIQUE_ORGANIZATIONS';

export const state = () => ({
  isLoggedIn: false,
  jobs: [],
  selectedOrgs: [],
});

export const mutations = {
  [LOGIN_USER](state) {
    state.isLoggedIn = true;
  },
  [RECIEVE_JOBS](state, jobs) {
    state.jobs = jobs;
  },
  [ADD_SELECTED_ORGS](state, organizations) {
    state.selectedOrgs = organizations;
  },
};

export const getters = {
  [UNIQUE_ORGANIZATIONS](state) {
    const uniqueOrganizations = new Set();
    state.jobs.forEach((job) => uniqueOrganizations.add(job.organization));
    return uniqueOrganizations;
  },
  [FILTERED_JOBS_BY_ORGS](state) {
    if (state.selectedOrgs.length === 0) {
      return state.jobs;
    }
    return state.jobs.filter((job) =>
      state.selectedOrgs.includes(job.organization)
    );
  },
};

export const actions = {
  [FETCH_JOBS]: async (context) => {
    const jobListings = await getJobs();
    context.commit(RECIEVE_JOBS, jobListings);
  },
};

const store = createStore({
  state,
  mutations,
  getters,
  actions,
  strict: process.env.NODE_ENV !== 'production',
});

export default store;
