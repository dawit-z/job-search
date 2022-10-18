import JobsSidebarJobTypes from '@/components/JobResults/JobsSidebarJobTypes.vue';
import { mount } from '@vue/test-utils';

describe('JobsSidebarJobTypes', () => {
  const createConfig = ($store, $router) => ({
    global: {
      mocks: {
        $store,
        $router,
      },
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  it('renders unique list of job types for filtering jobs', async () => {
    const $store = {
      getters: {
        UNIQUE_JOB_TYPES: new Set(['Part-time', 'Full-time']),
      },
    };
    const $router = { push: jest.fn() };
    const wrapper = mount(JobsSidebarJobTypes, createConfig($store, $router));
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger('click');
    const jobTypeLabels = wrapper.findAll("[data-test='job-type']");
    const jobTypes = jobTypeLabels.map((node) => node.text());
    expect(jobTypes).toEqual(['Part-time', 'Full-time']);
  });

  describe('when user clicks checkbox', () => {
    it('communicates user has selected job type', async () => {
      const commit = jest.fn();
      const $store = {
        getters: {
          UNIQUE_JOB_TYPES: new Set(['Full-time', 'Part-time']),
        },
        commit,
      };
      const $router = { push: jest.fn() };
      const wrapper = mount(JobsSidebarJobTypes, createConfig($store, $router));
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger('click');
      const fullTimeInput = wrapper.find("[data-test='Full-time']");
      await fullTimeInput.setChecked();

      expect(commit).toHaveBeenCalledWith('ADD_SELECTED_JOB_TYPES', [
        'Full-time',
      ]);
    });

    it('navigate user to job results page when filter is applied', async () => {
      const $store = {
        getters: {
          UNIQUE_JOB_TYPES: new Set(['Full-time', 'Part-time']),
        },
        commit: jest.fn(),
      };
      const $router = { push: jest.fn() };
      const wrapper = mount(JobsSidebarJobTypes, createConfig($store, $router));
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger('click');
      const fullTimeInput = wrapper.find("[data-test='Full-time']");
      await fullTimeInput.setChecked();
      expect($router.push).toHaveBeenCalledWith({ name: 'JobResults' });
    });
  });
});
