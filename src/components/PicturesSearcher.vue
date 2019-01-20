<template>
  <div class="search-wrapper">
    <div class="row mb-3">
      <div class="col-md-12">
        <input type="text" class="form-control search-input" placeholder="search pictures by tags ..." v-model="tags">
      </div>
    </div>
    <div class="results-wrapper">
      <div class="mb-3" v-if="showResults">
        <div>
          Results for tags:
          <span class="font-weight-bold text-green">{{tags}}</span>
        </div>
        <div>
          <strong class="text-green">{{totalItems}}</strong> items found
        </div>
      </div>
      <feed-list :items="items"></feed-list>
      <loading v-if="isLoading"></loading>
      <div class="alert alert-primary" v-if="end">Max length of 1000 feeds reached</div>
    </div>
  </div>
</template>

<script>
import FeedList from './FeedList.vue';
import loading from './Loading.vue';
import FeedItemModel from '../models/FeedItem';
import { api } from '../assets/constants';
import feedService from '../services/feed.service';
import { debounce } from 'lodash';

/*
 * Component for searching flickr images by tags
 * props:
 * tags - user input for the searched tags
 * items - current items displayed on screen
 * currentPage - parameter needed for calling flickr API
 * pageSize - parameter that represents items per page for flickr API
 * totalPages - the value is такен from flickr API call response and represents
 * total pages for current page size
 * isLoading - parameter that is used for toggle loading during requests
 * end - a flag that is put when the all 1000 item allowed from flickr feed api are loaded on the page
 * trigger - distance in px from bitton when the loading for the next page is triggered
 * totalItems - total items find in the search. Тhe value is такен from flickr API call response
 * showResults - a flag to toggle result rummary text
 */

export default {
  components: {
    'feed-list': FeedList,
    loading
  },
  data() {
    return {
      tags: '',
      items: [],
      currentPage: 0,
      pageSize: api.defaultPageSize,
      totalPages: null,
      totalItems: 0,
      isLoading: false,
      showResults: false,
      end: false,
      trigger: 300
    };
  },
  methods: {
    loadFeed() {
      if (this.currentPage === this.totalPages) {
        return;
      }
      //show loading
      this.isLoading = true;

      feedService
        .searchTags(this.tags, ++this.currentPage, this.pageSize)
        .then(response => {
          //hide loading
          this.isLoading = false;

          //if response status is ok process data
          if (response.data.stat === 'ok') {
            this.totalPages = response.data.photos.pages;
            this.totalItems = response.data.photos.total;
            this.showResults = true;

            response.data.photos.photo.forEach(element => {
              this.items.push(new FeedItemModel(element));
            });
          }
        });
    },
    scroll() {
      let that = this;

      window.onscroll = () => {
        //chech is we have reached bottom of the page to load next items
        if (
          !that.isLoading &&
          window.innerHeight + window.scrollY >=
            document.body.scrollHeight - that.trigger
        ) {
          if (that.currentPage < that.totalPages) {
            that.loadFeed();
          } else {
            that.end = true;
          }
        }
      };
    },
    debouncer() {}
  },
  mounted: function() {
    //add scroll listener for the infinite scroll
    this.scroll();

    //attach debounce function for user input
    //the function will be called 700ms after user stops typing
    this.debouncer = debounce(function() {
      this.items = [];
      this.showResults = false;
      this.loadFeed();
    }, 700);
  },
  watch: {
    //listen for tags parameter change and call debounce function
    tags: function() {
      this.debouncer();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/colors';

.search-wrapper {
  margin: 0 auto;
  height: 100%;
  width: 100%;
  .search-input {
    border-radius: 18px;
  }
}

.text-green {
  color: $b-green;
}
</style>
