import actions from '@/store/actions';

import getJobs from '@/api/getJobs';
jest.mock('@/api/getJobs');

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
