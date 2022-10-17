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

  describe('UNIQUE_JOB_TYPES', () => {
    it('finds unique job types from list of jobs', () => {
      const state = {
        jobs: [
          { jobType: 'Part-time' },
          { jobType: 'Intern' },
          { jobType: 'Part-time' },
        ],
      };
      const result = getters.UNIQUE_JOB_TYPES(state);
      expect(result).toEqual(new Set(['Part-time', 'Intern', 'Part-time']));
    });
  });

  describe('INCLUDE_JOB_BY_ORG', () => {
    describe('when user has not selected an org', () => {
      it('includes job', () => {
        const state = { selectedOrgs: [] };
        const job = { organization: 'Google' };

        const includeJob = getters.INCLUDE_JOB_BY_ORG(state)(job);
        expect(includeJob).toBe(true);
      });

      it('identifies if job is associated with given orgs', () => {
        const state = { selectedOrgs: ['Samsung', 'Apple'] };
        const job = { organization: 'Apple' };

        const includeJob = getters.INCLUDE_JOB_BY_ORG(state)(job);
        expect(includeJob).toBe(true);
      });
    });
  });

  describe('INCLUDE_JOB_BY_JOB_TYPE', () => {
    describe('when user has not selected any job types', () => {
      it('includes job', () => {
        const state = { selectedJobTypes: [] };
        const job = { jobType: 'Full-time' };

        const includeJob = getters.INCLUDE_JOB_BY_JOB_TYPE(state)(job);
        expect(includeJob).toBe(true);
      });

      it('identifies if job is associated with given job types', () => {
        const state = { selectedJobTypes: ['Full-time', 'Part-time'] };
        const job = { jobType: 'Part-time' };

        const includeJob = getters.INCLUDE_JOB_BY_JOB_TYPE(state)(job);
        expect(includeJob).toBe(true);
      });
    });
  });

  describe('FILTERED_JOBS', () => {
    it('filters jobs by org and job type', () => {
      const INCLUDE_JOB_BY_ORG = jest.fn().mockReturnValue(true);
      const INCLUDE_JOB_BY_JOB_TYPE = jest.fn().mockReturnValue(true);
      const mockGetters = {
        INCLUDE_JOB_BY_JOB_TYPE,
        INCLUDE_JOB_BY_ORG,
      };

      const job = { id: 1, title: 'Best job ever' };
      const state = { jobs: [job] };

      const result = getters.FILTERED_JOBS(state, mockGetters);
      expect(result).toEqual([job]);
      expect(INCLUDE_JOB_BY_ORG).toHaveBeenCalledWith(job);
      expect(INCLUDE_JOB_BY_JOB_TYPE).toHaveBeenCalledWith(job);
    });
  });
});
