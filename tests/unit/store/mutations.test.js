import mutations from '@/store/mutations';

describe('mutations', () => {
  describe('LOGIN_USER', () => {
    it('logs user in', () => {
      const state = { isLoggedIn: false };
      mutations.LOGIN_USER(state);
      expect(state).toEqual({ isLoggedIn: true });
    });
  });

  describe('RECIEVE_JOBS', () => {
    it('recieves jobs from API response', () => {
      const state = { jobs: [] };
      mutations.RECIEVE_JOBS(state, ['Google', 'Apple']);
      expect(state).toEqual({ jobs: ['Google', 'Apple'] });
    });
  });

  describe('ADD_SELECTED_ORGS', () => {
    it('updates list of orgs that user selects', () => {
      const state = { selectedOrgs: [] };
      mutations.ADD_SELECTED_ORGS(state, ['Lyft', 'Tinder']);
      expect(state).toEqual({ selectedOrgs: ['Lyft', 'Tinder'] });
    });
  });

  describe('ADD_SELECTED_TYPES', () => {
    it('updates job types that user selects', () => {
      const state = { selectedJobTypes: [] };
      mutations.ADD_SELECTED_JOB_TYPES(state, ['Full-time', 'Part-time']);
      expect(state).toEqual({ selectedJobTypes: ['Full-time', 'Part-time'] });
    });
  });
});
