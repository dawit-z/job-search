import { mount } from "@vue/test-utils";
import MainNav from "@/components/MainNav.vue";

describe("MainNav", () => {
  it("displays company name", () => {
    const wrapper = mount(MainNav);
    expect(wrapper.text()).toMatch("Careers");
  });

  it("displays menu items for navigation", () => {
    const wrapper = mount(MainNav);
    const navMenuItems = wrapper.findAll("[data-test='main-nav-list-item']");
    const navMenuTexts = navMenuItems.map((item) => item.text());

    expect(navMenuTexts).toEqual([
      "Teams",
      "Locations",
      "Life at Careers",
      "How we Hire",
      "Students",
      "Jobs",
    ]);
  });

  describe("when user is logged out", () => {
    it("prompts user to sign in", () => {
      const wrapper = mount(MainNav, {
        data() {
          return {
            isLoggedIn: false,
          };
        },
      });
      const loginButton = wrapper.find("[data-test='login-button']");
      const profileImage = wrapper.find("[data-test='profile-image']");
      expect(loginButton.exists()).toBeTruthy();
      expect(profileImage.exists()).toBeFalsy();
    });
  });

  describe("when user logs in", () => {
    it("displays user profile picture", () => {
      const wrapper = mount(MainNav);
      const loginButton = wrapper.find("[data-test='login-button']");
      const profileImage = wrapper.find("[data-test='profile-image']");
      expect(loginButton.exists()).toBeFalsy();
      expect(profileImage.exists()).toBeTruthy();
    });
  });
});
