<template>
  <div id="feed">
    <feed-list :items="items"></feed-list>
    <loading v-if="isLoading"></loading>
    <div class="alert alert-primary" v-if="end">Max length of 1000 feeds reached</div>
  </div>
</template>

<script>
import FeedList from './FeedList.vue';
import loading from './Loading.vue';
import FeedItemModel from '../models/FeedItem';
import { api } from '../assets/constants';
import feedService from '../services/feed.service';

/*
 * Component for displaying latest feeds
 * props:
 * items - current items displayed on screen
 * currentPage - parameter needed for calling flickr API
 * pageSize - parameter that represents items per page for flickr API
 * totalPages - the value is taken from flickr API call response and represents
 * total pages for current page size
 * isLoading - parameter that is used for toggle loading during requests
 * end - a flag that is put when the all 1000 item allowed from flickr feed api are loaded on the page
 * trigger - distance in px from bitton when the loading for the next page is triggered
 */

export default {
  components: {
    'feed-list': FeedList,
    loading
  },
  data() {
    return {
      items: [],
      currentPage: 0,
      pageSize: api.defaultPageSize,
      totalPages: null,
      isLoading: false,
      end: false,
      trigger: 300
    };
  },
  methods: {
    loadFeed() {
      if (this.currentPage === this.totalPages) {
        return;
      }

      //show loading ...
      this.isLoading = true;

      feedService
        .resentFeed(++this.currentPage, this.pageSize)
        .then(response => {
          //hide loading
          this.isLoading = false;

          //if response status is ok process data
          if (response.data.stat === 'ok') {
            this.totalPages = response.data.photos.pages;

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
    }
  },
  mounted: function() {
    //add scroll listener for the infinite scroll
    this.scroll();

    //fetch latest feeds from flickr
    this.loadFeed();
  }
};
</script>

<style>
</style>
