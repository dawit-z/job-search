import {
  useFilteredJobs,
  useUniqueJobs,
  useUniqueOrgs,
} from '@/store/composables';
import { useStore } from 'vuex';
jest.mock('vuex');

describe('composables', () => {
  describe('useFilteredJobs', () => {
    it('retrieves filtered jobs from store', () => {
      useStore.mockReturnValue({
        getters: {
          FILTERED_JOBS: [{ id: 1 }],
        },
      });

      const result = useFilteredJobs();
      expect(result.value).toEqual([{ id: 1 }]);
    });
  });

  describe('useUniqueJobs', () => {
    it('gets unique job types from store', () => {
      useStore.mockReturnValue({
        getters: {
          UNIQUE_JOB_TYPES: new Set(['Full-time']),
        },
      });

      const result = useUniqueJobs();
      expect(result.value).toEqual(new Set(['Full-time']));
    });
  });

  describe('useUniqueOrganizations', () => {
    it('gets unique job orgs from store', () => {
      useStore.mockReturnValue({
        getters: {
          UNIQUE_ORGANIZATIONS: new Set(['Apple']),
        },
      });

      const result = useUniqueOrgs();
      expect(result.value).toEqual(new Set(['Apple']));
    });
  });
});
