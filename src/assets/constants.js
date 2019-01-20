/*
 * Application shared constant props and default settings that are used in components
 * WARNING: CHANGING THE VALUE OF ANY PROP MAY AFFECT THE APPLICATION BEHAVIOR
 */

export const api = {
    baseUrl: 'https://api.flickr.com/services/rest',
    key: 'a166167ded1a00e8ae3ba7c65bbbf915',
    extras: ['description', 'owner_name', 'tags', 'url_sq', 'url_t', 'url_s', 'url_q', 'url_m', 'url_n', 'url_z', 'url_c', 'url_l', 'url_o'],
    methods: {
        recentPhotos: 'flickr.photos.getRecent',
        search: 'flickr.photos.search'
    },
    defaultPageSize: 10
};

export const models = {
    flickrPeopleUrl: 'https://www.flickr.com/people/',
    flickrPhotosUrl: 'https://www.flickr.com/photos/',
}