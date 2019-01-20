import { shallowMount, mount } from '@vue/test-utils'
import FeedList from '@/components/FeedList.vue'
import FeedItem from '@/components/FeedItem.vue'
import FeedItemModel from '@/models/FeedItem'
import { picture } from './test-data'

describe('FeedList.vue', () => {
  it('renders model', () => {
    const model = new FeedItemModel(picture);
    const wrapper = shallowMount(FeedList, {
      propsData: {
        items: [new FeedItemModel(picture)]
      }
    })

    expect(wrapper.isVisible()).toBeTruthy();
  })

  it('renders exact count', () => {
    const wrapper = mount(FeedList, {
      propsData: {
        items: [new FeedItemModel(picture), new FeedItemModel(picture),]
      }
    })

    expect(wrapper.findAll('.card').length).toEqual(2)
  })
})
