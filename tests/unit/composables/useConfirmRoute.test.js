import useConfirmRoute from '@/composables/useConfirmRoute';
import { useRoute } from 'vue-router';
jest.mock('vue-router');

describe('useConfirmRoute', () => {
  it('checks if page route matches specified route', () => {
    useRoute.mockReturnValue({ name: 'Jobs' });
    const routeName = 'Jobs';
    const result = useConfirmRoute(routeName);
    expect(result.value).toBe(true);
  });
});
