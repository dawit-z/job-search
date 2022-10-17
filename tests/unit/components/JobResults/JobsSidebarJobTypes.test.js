import JobsSidebarJobTypes from '@/components/JobResults/JobsSidebarJobTypes.vue';
import { mount } from '@vue/test-utils';

describe('JobsSidebarJobTypes', () => {
  const createConfig = ($store) => ({
    global: {
      mocks: {
        $store,
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
    const wrapper = mount(JobsSidebarJobTypes, createConfig($store));
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger('click');
    const jobTypeLabels = wrapper.findAll("[data-test='job-type']");
    const jobTypes = jobTypeLabels.map((node) => node.text());
    expect(jobTypes).toEqual(['Part-time', 'Full-time']);
  });

  it('communicates user has selected job type', async () => {
    const commit = jest.fn();
    const $store = {
      getters: {
        UNIQUE_JOB_TYPES: new Set(['Full-time', 'Part-time']),
      },
      commit,
    };
    const wrapper = mount(JobsSidebarJobTypes, createConfig($store));
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger('click');
    const fullTimeInput = wrapper.find("[data-test='Full-time']");
    await fullTimeInput.setChecked();

    expect(commit).toHaveBeenCalledWith('ADD_SELECTED_JOB_TYPES', [
      'Full-time',
    ]);
  });
});
