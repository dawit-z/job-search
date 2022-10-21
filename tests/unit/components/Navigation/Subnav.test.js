import Subnav from '@/components/Navigation/Subnav.vue';
import useConfirmRoute from '@/composables/useConfirmRoute';
import { useFilteredJobs } from '@/store/composables';
import { mount } from '@vue/test-utils';
jest.mock('@/composables/useConfirmRoute');
jest.mock('@/store/composables');

describe('Subnav', () => {
  const configObject = () => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  describe('when user is on job page', () => {
    it('displays job count', () => {
      useConfirmRoute.mockReturnValue(true);
      useFilteredJobs.mockReturnValue([{ id: 1 }, { id: 2 }]);
      const wrapper = mount(Subnav, configObject());
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.text()).toMatch('2 jobs matched');
    });
  });

  describe('when user is not on job page', () => {
    it('does NOT display job count', () => {
      useConfirmRoute.mockReturnValue(false);
      useFilteredJobs.mockReturnValue([]);
      const wrapper = mount(Subnav, configObject());
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
