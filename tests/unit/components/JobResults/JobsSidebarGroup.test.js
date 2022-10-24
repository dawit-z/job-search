import JobsSidebarGroup from '@/components/JobResults/JobsSidebarGroup.vue';
import { mount } from '@vue/test-utils';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
jest.mock('vuex');
jest.mock('vue-router');

describe('JobsSidebarGroup', () => {
  const createConfig = (props = {}) => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
    props: {
      header: 'Some header',
      uniqueValues: new Set(['ValueA', 'ValueB']),
      mutation: 'Some mutation',
      ...props,
    },
  });

  it('renders unique list of job types for filtering', async () => {
    const props = {
      uniqueValues: new Set(['ValueA', 'ValueB']),
    };
    const wrapper = mount(JobsSidebarGroup, createConfig(props));
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger('click');
    const inputLabels = wrapper.findAll("[data-test='value']");
    const inputValues = inputLabels.map((node) => node.text());
    expect(inputValues).toEqual(['ValueA', 'ValueB']);
  });

  describe('when user clicks checkbox', () => {
    it('communicates user has selected value', async () => {
      const commit = jest.fn();
      useStore.mockReturnValue({ commit });
      useRouter.mockReturnValue({ push: jest.fn() });
      const props = {
        mutation: 'SOME_MUTATION',
        uniqueValues: new Set(['Full-time']),
      };
      const wrapper = mount(JobsSidebarGroup, createConfig(props));
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger('click');
      const fullTimeInput = wrapper.find("[data-test='Full-time']");
      await fullTimeInput.setChecked();

      expect(commit).toHaveBeenCalledWith('SOME_MUTATION', ['Full-time']);
    });

    it('navigate user to job results page when filter is applied', async () => {
      useStore.mockReturnValue({ commit: jest.fn() });
      const push = jest.fn();
      useRouter.mockReturnValue({ push });
      const props = {
        uniqueValues: new Set(['Full-time']),
      };
      const wrapper = mount(JobsSidebarGroup, createConfig(props));
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger('click');
      const fullTimeInput = wrapper.find("[data-test='Full-time']");
      await fullTimeInput.setChecked();

      expect(push).toHaveBeenCalledWith({ name: 'JobResults' });
    });
  });
});
