import useCurrentPage from '@/composables/useCurrentPage';
import { useRoute } from 'vue-router';
jest.mock('vue-router');

describe('useCurrentPage', () => {
  describe('when query params include page', () => {
    it('returns page number', () => {
      useRoute.mockReturnValue({
        query: {
          page: '5',
        },
      });
      const result = useCurrentPage();
      expect(result.value).toBe(5);
    });
  });

  describe('when query params exclude page', () => {
    it('returns 1', () => {
      useRoute.mockReturnValue({
        query: {
          page: '',
        },
      });
      const result = useCurrentPage();
      expect(result.value).toBe(1);
    });
  });
});
