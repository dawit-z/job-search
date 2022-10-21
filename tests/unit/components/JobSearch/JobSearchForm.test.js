import JobSearchForm from '@/components/JobSearch/JobSearchForm.vue';
import { mount } from '@vue/test-utils';
import { useRouter } from 'vue-router';
jest.mock('vue-router');

describe('Job Search Form', () => {
  describe('When user submits form', () => {
    it('navigates to job results page with query params', async () => {
      const push = jest.fn();
      useRouter.mockReturnValue({
        push,
      });

      const wrapper = mount(JobSearchForm, {
        attachTo: document.body,
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });

      const roleInput = wrapper.find("[data-test='role']");
      await roleInput.setValue('Manager');

      const locationInput = wrapper.find("[data-test='location']");
      await locationInput.setValue('Dayton');

      const searchButton = wrapper.find("[data-test='submit-button']");
      await searchButton.trigger('click');

      expect(push).toHaveBeenCalledWith({
        name: 'JobResults',
        query: {
          role: 'Manager',
          location: 'Dayton',
        },
      });
    });
  });
});
