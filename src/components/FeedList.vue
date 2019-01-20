<template>
  <div class="row">
    <div v-for="(item, index) in items" :key="'feed' + index" class="col-md-12">
      <feed-item :model="item"></feed-item>
    </div>
  </div>
</template>

<script>
import FeedItem from './FeedItem.vue';

export default {
  props: {
    items: Array
  },
  components: {
    'feed-item': FeedItem
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
</style>
