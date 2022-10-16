import Subnav from '@/components/Navigation/Subnav.vue';
import { mount } from '@vue/test-utils';

describe('Subnav', () => {
  const configObject = (routeName, $store = {}) => ({
    global: {
      mocks: {
        $route: {
          name: routeName,
        },
        $store,
      },
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  describe('when user is on job page', () => {
    it('displays job count', () => {
      const routeName = 'JobResults';
      const $store = {
        getters: {
          FILTERED_JOBS_BY_ORGS: [{ id: 1 }, { id: 2 }],
        },
      };
      const wrapper = mount(Subnav, configObject(routeName, $store));
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.text()).toMatch('2 jobs matched');
    });
  });

  describe('when user is not on job page', () => {
    it('does not displays job count', () => {
      const routeName = 'Home';
      const wrapper = mount(Subnav, configObject(routeName));
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
