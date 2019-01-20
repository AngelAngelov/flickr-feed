<template>
  <div class="p-3">
    <feed-loader class="feed col-lg-4 col-md-6 col-sm-8 col-12"></feed-loader>
  </div>
</template>

<script>
// @ is an alias to /src
import FeedLoader from '@/components/FeedLoader.vue';

export default {
  name: 'home',
  components: {
    'feed-loader': FeedLoader
  }
};
</script>

<style lang="scss" scoped >
.feed {
  margin: 0 auto;
  padding: 0;
}
</style>

