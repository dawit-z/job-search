import JobsSidebarJobTypes from '@/components/JobResults/JobsSidebarJobTypes.vue';
import { useUniqueJobs } from '@/store/composables';
import { mount } from '@vue/test-utils';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
jest.mock('vuex');
jest.mock('vue-router');
jest.mock('@/store/composables');

describe('JobsSidebarJobTypes', () => {
  const createConfig = () => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  it('renders unique list of job types for filtering jobs', async () => {
    useUniqueJobs.mockReturnValue(new Set(['Full-time', 'Part-time']));
    const wrapper = mount(JobsSidebarJobTypes, createConfig());
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger('click');
    const jobTypeLabels = wrapper.findAll("[data-test='job-type']");
    const jobTypes = jobTypeLabels.map((node) => node.text());
    expect(jobTypes).toEqual(['Full-time', 'Part-time']);
  });

  describe('when user clicks checkbox', () => {
    it('communicates user has selected job type', async () => {
      useUniqueJobs.mockReturnValue(new Set(['Full-time', 'Part-time']));
      const commit = jest.fn();
      useStore.mockReturnValue({ commit });
      useRouter.mockReturnValue({ push: jest.fn() });
      const wrapper = mount(JobsSidebarJobTypes, createConfig());
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger('click');
      const fullTimeInput = wrapper.find("[data-test='Full-time']");
      await fullTimeInput.setChecked();

      expect(commit).toHaveBeenCalledWith('ADD_SELECTED_JOB_TYPES', [
        'Full-time',
      ]);
    });

    it('navigate user to job results page when filter is applied', async () => {
      useUniqueJobs.mockReturnValue(new Set(['Full-time', 'Part-time']));
      useStore.mockReturnValue({ commit: jest.fn() });
      const push = jest.fn();
      useRouter.mockReturnValue({ push });
      const wrapper = mount(JobsSidebarJobTypes, createConfig());
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger('click');
      const fullTimeInput = wrapper.find("[data-test='Full-time']");
      await fullTimeInput.setChecked();

      expect(push).toHaveBeenCalledWith({ name: 'JobResults' });
    });
  });
});
