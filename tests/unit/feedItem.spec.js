import { shallowMount } from '@vue/test-utils'
import FeedItem from '@/components/FeedItem.vue'
import FeedItemModel from '@/models/FeedItem'
import { picture } from './test-data'

describe('FeedItem.vue', () => {
  it('renders title', () => {
    const model = new FeedItemModel(picture);

    const wrapper = shallowMount(FeedItem, {
      propsData: {
        model: model
      }
    })

    expect(wrapper.find('.title-link').text()).toMatch(model.title);
  })

  it('renders author', () => {
    const model = new FeedItemModel(picture);

    const wrapper = shallowMount(FeedItem, {
      propsData: {
        model: model
      }
    })

    expect(wrapper.find('.author').text()).toMatch(model.author);
  })

  it('renders picture', () => {
    const model = new FeedItemModel(picture);

    const wrapper = shallowMount(FeedItem, {
      propsData: {
        model: model
      }
    })

    expect(wrapper.find('.card-img-top').attributes('src')).toMatch(model.media);
  })

  it('renders description', () => {
    const model = new FeedItemModel(picture);

    const wrapper = shallowMount(FeedItem, {
      propsData: {
        model: model
      }
    })

    expect(wrapper.find('.card-text').isVisible()).toBeTruthy();
  })

  it('do not render empty description', () => {
    let model = new FeedItemModel(picture);
    model.description = null;

    const wrapper = shallowMount(FeedItem, {
      propsData: {
        model: model
      }
    })

    expect(wrapper.contains('.card-text')).toBe(false);
  })

  it('renders tags', () => {
    const model = new FeedItemModel(picture);

    const wrapper = shallowMount(FeedItem, {
      propsData: {
        model: model
      }
    })

    expect(wrapper.find('.tags').text()).toMatch(model.tags.split(' ').join(', '));
  })
})
