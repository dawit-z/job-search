import getJobs from '@/api/getJobs';
import { actions, getters, mutations, state } from '@/store';
jest.mock('@/api/getJobs');

describe('state', () => {
  it('keeps track of user login status', () => {
    const startingState = state();
    expect(startingState.isLoggedIn).toBe(false);
  });

  it('stores job listings', () => {
    const startingState = state();
    expect(startingState.jobs).toEqual([]);
  });

  it('stores selected organizations to filter jobs', () => {
    const startingState = state();
    expect(startingState.selectedOrgs).toEqual([]);
  });
});

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
});

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

describe('actions', () => {
  describe('FETCH_JOBS', () => {
    beforeEach(() => {
      getJobs.mockResolvedValue([{ id: 1, title: 'Amazon Developer' }]);
    });

    it('makes request to fetch jobs', async () => {
      const context = { commit: jest.fn() };
      await actions.FETCH_JOBS(context);
      expect(getJobs).toHaveBeenCalled();
    });

    it('sends message to save jobs in store', async () => {
      const commit = jest.fn();
      const context = { commit };
      await actions.FETCH_JOBS(context);
      expect(commit).toHaveBeenCalledWith('RECIEVE_JOBS', [
        { id: 1, title: 'Amazon Developer' },
      ]);
    });
  });
});
