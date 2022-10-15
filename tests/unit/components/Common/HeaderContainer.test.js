import HeaderContainer from '@/components/Common/HeaderContainer.vue';
import { mount } from '@vue/test-utils';

describe('HeaderContainer', () => {
  it('allows parent component to provide title content', () => {
    const wrapper = mount(HeaderContainer, {
      slots: {
        title: '<h2>Sample Title</h2>',
      },
    });

    expect(wrapper.text()).toMatch('Sample Title');
  });

  it('allows parent component to provide subtitle content', () => {
    const wrapper = mount(HeaderContainer, {
      slots: {
        subtitle: '<h3>Sample Subtitle</h3>',
      },
    });

    expect(wrapper.text()).toMatch('Sample Subtitle');
  });
});
