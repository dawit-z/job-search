import { FILTERED_JOBS_BY_ORGS, UNIQUE_ORGANIZATIONS } from '@/store/constants';

const getters = {
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

export default getters;
