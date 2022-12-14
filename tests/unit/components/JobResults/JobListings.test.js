import JobListings from '@/components/JobResults/JobListings.vue';
import { flushPromises, RouterLinkStub, shallowMount } from '@vue/test-utils';

describe('JobListings', () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: '5',
      ...queryParams,
    },
  });

  const createStore = (config = {}) => ({
    getters: {
      FILTERED_JOBS: [],
    },
    dispatch: jest.fn(),
    ...config,
  });

  const createConfig = () => ({
    global: {
      stubs: {
        'router-link': RouterLinkStub,
      },
    },
  });

  describe('when component mounts', () => {
    it('makes call to fetch jobs from API', async () => {
      const $route = createRoute();
      const dispatch = jest.fn();
      const $store = createStore({ dispatch });
      shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      expect(dispatch).toHaveBeenCalledWith('FETCH_JOBS');
    });
  });

  it('creates a job listing for a max of 10 jobs per page', async () => {
    const queryParams = { page: '1' };
    const $route = createRoute(queryParams);
    const numberOfJobsInStore = 15;
    const $store = createStore({
      getters: {
        FILTERED_JOBS: Array(numberOfJobsInStore).fill({}),
      },
    });
    const wrapper = shallowMount(JobListings, createConfig($route, $store));
    await flushPromises();
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(10);
  });

  describe('when query params exclude page number', () => {
    it('displays page number 1', () => {
      const queryParams = { page: undefined };
      const $route = createRoute(queryParams);
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      expect(wrapper.text()).toMatch('Page 1');
    });
  });

  describe('when query params include page number', () => {
    it('displays page number', () => {
      const queryParams = { page: '3' };
      const $route = createRoute(queryParams);
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      expect(wrapper.text()).toMatch('Page 3');
    });
  });

  describe('when user is on the first page', () => {
    it('does not display link to previous page', () => {
      const queryParams = { page: '1' };
      const $route = createRoute(queryParams);
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(false);
    });

    it('displays link to next page', async () => {
      const queryParams = { page: '1' };
      const $route = createRoute(queryParams);
      const $store = createStore({
        getters: {
          FILTERED_JOBS: Array(15).fill({}),
        },
      });
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(true);
    });
  });

  describe('when user is on the last page', () => {
    it('does not display link to next page', async () => {
      const queryParams = { page: '2' };
      const $route = createRoute(queryParams);
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(false);
    });

    it('displays link to previous page', async () => {
      const queryParams = { page: '2' };
      const $route = createRoute(queryParams);
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(true);
    });
  });
});
