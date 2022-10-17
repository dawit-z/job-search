import JobsSidebarOrganization from '@/components/JobResults/JobsSidebarOrganization';
import { mount } from '@vue/test-utils';

describe('JobsSidebarOrganizations', () => {
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

  it('renders unique list of orgs for filtering jobs', async () => {
    const $store = {
      getters: {
        UNIQUE_ORGANIZATIONS: new Set(['Amazon', 'Uber', 'Microsoft']),
      },
    };
    const wrapper = mount(JobsSidebarOrganization, createConfig($store));
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger('click');
    const orgLabels = wrapper.findAll("[data-test='organization']");
    const organizations = orgLabels.map((node) => node.text());
    expect(organizations).toEqual(['Amazon', 'Uber', 'Microsoft']);
  });

  it('emits action that user has selected checkbox', async () => {
    const commit = jest.fn();
    const $store = {
      getters: {
        UNIQUE_ORGANIZATIONS: new Set(['Google', 'Amazon']),
      },
      commit,
    };
    const wrapper = mount(JobsSidebarOrganization, createConfig($store));
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger('click');
    const googleInput = wrapper.find("[data-test='Google']");
    await googleInput.setChecked();
    expect(commit).toHaveBeenCalledWith('ADD_SELECTED_ORGS', ['Google']);
  });
});
