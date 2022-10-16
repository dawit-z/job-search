import getters from '@/store/getters';

describe('getters', () => {
  describe('UNIQUE_ORGANIZATIONS', () => {
    it('retrieves unique set of job orgs', () => {
      const state = {
        jobs: [
          { organization: 'Google' },
          { organization: 'Amazon' },
          { organization: 'Google' },
        ],
      };
      const result = getters.UNIQUE_ORGANIZATIONS(state);
      expect(result).toEqual(new Set(['Google', 'Amazon']));
    });
  });

  describe('FILTERED_JOBS_BY_ORGS', () => {
    it('filters jobs by organization', () => {
      const state = {
        jobs: [
          { organization: 'Google' },
          { organization: 'Amazon' },
          { organization: 'Microsoft' },
        ],
        selectedOrgs: ['Google', 'Microsoft'],
      };

      const result = getters.FILTERED_JOBS_BY_ORGS(state);
      expect(result).toEqual([
        { organization: 'Google' },
        { organization: 'Microsoft' },
      ]);
    });

    describe('when the user has not selected any orgs', () => {
      it('returns all jobs', () => {
        const state = {
          jobs: [
            { organization: 'Google' },
            { organization: 'Amazon' },
            { organization: 'Microsoft' },
          ],
          selectedOrgs: [],
        };

        const filteredJobs = getters.FILTERED_JOBS_BY_ORGS(state);
        expect(filteredJobs).toEqual([
          { organization: 'Google' },
          { organization: 'Amazon' },
          { organization: 'Microsoft' },
        ]);
      });
    });
  });
});
