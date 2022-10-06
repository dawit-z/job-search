import JobListing from "@/components/JobResults/JobListing.vue";
import { mount, RouterLinkStub } from "@vue/test-utils";

describe("JobListing", () => {
  const createJob = (jobProps = {}) => ({
    title: "Angular Dev",
    organization: "Uber",
    locations: ["Columbus"],
    minimumQualifications: ["Education"],
    ...jobProps,
  });

  const createConfig = (jobProps) => ({
    props: {
      job: {
        ...jobProps,
      },
    },
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  it("renders job title", () => {
    const jobProps = createJob({ title: "Java Programmer" });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Java Programmer");
  });

  it("renders job organization", () => {
    const jobProps = createJob({ organization: "Uber" });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Uber");
  });

  it("renders job locations", () => {
    const jobProps = createJob({ locations: ["Dayton", "Cincinnati"] });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Dayton");
    expect(wrapper.text()).toMatch("Cincinnati");
  });

  it("renders job qualification", () => {
    const jobProps = createJob({
      minimumQualifications: ["Phd", "Comptia A+"],
    });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Phd");
    expect(wrapper.text()).toMatch("Comptia A+");
  });

  it("links to respective job's page", () => {
    const jobProps = createJob({
      id: 15,
    });
    const wrapper = mount(JobListing, createConfig(jobProps));
    const jobPageLink = wrapper.findComponent(RouterLinkStub);
    const toProp = jobPageLink.props("to");
    expect(toProp).toBe("/jobs/15");
  });
});
