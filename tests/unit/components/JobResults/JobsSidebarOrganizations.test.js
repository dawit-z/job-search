import JobsSidebarOrganization from '@/components/JobResults/JobsSidebarOrganization';
import { useUniqueOrgs } from '@/store/composables';
import { mount } from '@vue/test-utils';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
jest.mock('vue-router');
jest.mock('vuex');
jest.mock('@/store/composables');

describe('JobsSidebarOrganizations', () => {
  const createConfig = () => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  it('renders unique list of orgs for filtering jobs', async () => {
    useUniqueOrgs.mockReturnValue(new Set(['Amazon', 'Uber', 'Microsoft']));
    const wrapper = mount(JobsSidebarOrganization, createConfig());
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger('click');
    const orgLabels = wrapper.findAll("[data-test='organization']");
    const organizations = orgLabels.map((node) => node.text());
    expect(organizations).toEqual(['Amazon', 'Uber', 'Microsoft']);
  });

  describe('when user clicks checkbox', () => {
    it('emits action that user has selected checkbox', async () => {
      useUniqueOrgs.mockReturnValue(new Set(['Google', 'Amazon']));
      const commit = jest.fn();
      useStore.mockReturnValue({ commit });
      useRouter.mockReturnValue({ push: jest.fn() });
      const wrapper = mount(JobsSidebarOrganization, createConfig());
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger('click');
      const googleInput = wrapper.find("[data-test='Google']");
      await googleInput.setChecked();

      expect(commit).toHaveBeenCalledWith('ADD_SELECTED_ORGS', ['Google']);
    });

    it('navigate user to job results page when filter is applied', async () => {
      useUniqueOrgs.mockReturnValue(new Set(['Google', 'Amazon']));
      useStore.mockReturnValue({ commit: jest.fn() });
      const push = jest.fn();
      useRouter.mockReturnValue({ push });
      const wrapper = mount(JobsSidebarOrganization, createConfig());
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger('click');
      const googleInput = wrapper.find("[data-test='Google']");
      await googleInput.setChecked();

      expect(push).toHaveBeenCalledWith({ name: 'JobResults' });
    });
  });
});
