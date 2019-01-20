/*  
    This service is used to communicate with Flickr API
    Methods: 
    buildUrl - build url to call flickr api according to the params passed
        params : 
            method: option from assests/constants/api.methods,
            page: number, the page number that we want to fetch
            itemsPerPage: number, number of items on the page
        returns: string
    getRecentFeed - loads latest feeds from flickr
        params :
            page: number, the page number that we want to fetch
            itemsPerPage: number, number of items on the page
        returns: Promise
    searchByTags - search pictures in flickr by givven tags
        params :
            tags: string, user input
            page: number, the page number that we want to fetch
            itemsPerPage: number, number of items on the page
            mode: string, default 'all', options: all, any. Either 'any' for an OR combination of tags, or 'all' for an AND combination
        returns: Promise
*/

import axios from 'axios';
import { api } from "../assets/constants";

function buildUrl(method, page, itemsPerPage) {
    return `${api.baseUrl}?method=${method}&api_key=${api.key}&page=${page || 1}&per_page=${itemsPerPage || api.defaultPageSize}&format=json&nojsoncallback=1&extras=${api.extras.join(',')}`;
}

function getRecentFeed(page = 1, itemsPerPage) {
    let url = buildUrl(api.methods.recentPhotos, page, itemsPerPage);
    return axios.get(url)
}

function searchByTags(tags, page, itemsPerPage, mode = 'all') {
    let url = buildUrl(api.methods.search, page, itemsPerPage);
    let tagsStr = tags.split(',').map(el => el.trim().replace(' ', '+')).join(',');
    url += `&tags=${tagsStr}`;
    url += `&tag_mode=${mode}`

    return axios.get(url)
}

export default {
    resentFeed: getRecentFeed,
    searchTags: searchByTags
}