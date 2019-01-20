<template>
  <div class="search col-md-6 col-sm-8 col-12 p-3">
    <pics-search></pics-search>
  </div>
</template>

<script>
import PictureSearcher from '@/components/PicturesSearcher.vue';

export default {
  components: {
    'pics-search': PictureSearcher
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.search {
  margin: 0 auto;
  height: 100%;

  .search-input {
    border-radius: 18px;
  }
}
</style>

