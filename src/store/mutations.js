import { LOGIN_USER, RECIEVE_JOBS, ADD_SELECTED_ORGS } from '@/store/constants';

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
};

export default mutations;
