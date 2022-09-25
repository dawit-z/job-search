import { mount } from "@vue/test-utils";
import ActionButton from "@/components/ActionButton.vue";

describe("ActionButton", () => {
  it("renders text", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "Login",
        type: "primary",
      },
    });
    expect(wrapper.text()).toMatch("Login");
  });

  it("applies one of several styles to button", () => {
    const wrapper = mount(ActionButton, {
      props: {
        type: "primary",
        text: "blank",
      },
    });
    const button = wrapper.find("button");
    expect(button.classes("primary")).toBe(true);
  });
});
