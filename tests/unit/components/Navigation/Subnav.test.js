import Subnav from "@/components/Navigation/Subnav.vue";
import { mount } from "@vue/test-utils";

describe("Subnav", () => {
  const configObject = (routeName) => ({
    global: {
      mocks: {
        $route: {
          name: routeName,
        },
      },
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  describe("when user is on job page", () => {
    it("displays job count", () => {
      const routeName = "JobResults";
      const wrapper = mount(Subnav, configObject(routeName));
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(true);
    });
  });

  describe("when user is not on job page", () => {
    it("does not displays job count", () => {
      const routeName = "Home";
      const wrapper = mount(Subnav, configObject(routeName));
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
