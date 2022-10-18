import JobsSidebarOrganization from '@/components/JobResults/JobsSidebarOrganization';
import { mount } from '@vue/test-utils';

describe('JobsSidebarOrganizations', () => {
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

  it('renders unique list of orgs for filtering jobs', async () => {
    const $store = {
      getters: {
        UNIQUE_ORGANIZATIONS: new Set(['Amazon', 'Uber', 'Microsoft']),
      },
    };
    const $router = { push: jest.fn() };
    const wrapper = mount(
      JobsSidebarOrganization,
      createConfig($store, $router)
    );
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger('click');
    const orgLabels = wrapper.findAll("[data-test='organization']");
    const organizations = orgLabels.map((node) => node.text());
    expect(organizations).toEqual(['Amazon', 'Uber', 'Microsoft']);
  });

  describe('when user clicks checkbox', () => {
    it('emits action that user has selected checkbox', async () => {
      const commit = jest.fn();
      const $store = {
        getters: {
          UNIQUE_ORGANIZATIONS: new Set(['Google', 'Amazon']),
        },
        commit,
      };
      const $router = { push: jest.fn() };
      const wrapper = mount(
        JobsSidebarOrganization,
        createConfig($store, $router)
      );
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger('click');
      const googleInput = wrapper.find("[data-test='Google']");
      await googleInput.setChecked();
      expect(commit).toHaveBeenCalledWith('ADD_SELECTED_ORGS', ['Google']);
    });

    it('navigate user to job results page when filter is applied', async () => {
      const $store = {
        getters: {
          UNIQUE_ORGANIZATIONS: new Set(['Google', 'Amazon']),
        },
        commit: jest.fn(),
      };
      const $router = { push: jest.fn() };
      const wrapper = mount(
        JobsSidebarOrganization,
        createConfig($store, $router)
      );
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger('click');
      const googleInput = wrapper.find("[data-test='Google']");
      await googleInput.setChecked();
      expect($router.push).toHaveBeenCalledWith({ name: 'JobResults' });
    });
  });
});
