<template>
  <div class="card mb-3">
    <div class="card-header">
      <div>
        <a :href="model.mediaLink" class="title-link">{{model.title}}</a>
      </div>
      <div>
        by
        <a :href="model.authorLink" target="_blank" class="author">{{model.author}}</a>
      </div>
    </div>
    <img :src="model.media" class="card-img-top" alt="...">
    <div class="card-body">
      <div class="card-title"></div>
      <div class="card-text mb-2" v-if="model.description">
        <read-more more-str="read more" :text="model.description" link="#" less-str="show less" :max-chars="250"></read-more>
      </div>
      <div v-if="model.tags.length">
        <strong class="float-left">Tags:&nbsp;</strong>
        <p class="tags">{{model.tags.split(' ').join(', ')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import FeedItemModel from '../models/FeedItem';
import ReadMore from 'vue-read-more';
import Vue from 'vue';

Vue.use(ReadMore);

export default {
  props: {
    model: FeedItemModel
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/colors';

.card {
  p {
    text-align: left !important;
    .tags {
      font-style: italic;
    }
  }
  a {
    color: $b-green;
  }
  .picture-tag {
    display: block;
    width: fit-content;
    float: left;
  }
  .title-link {
    font-weight: bold;
  }
}
</style>
