import { models } from "../assets/constants";

class FeedItem {
    constructor(props) {
        this.id = props.id;
        this.title = props.title.trim();
        this.media = unescape(props.url_n || props.url_m) || null;
        this.description = props.description._content || null;
        this.author = props.ownername || null;
        this.author_id = props.owner || null;
        this.tags = props.tags || [];
        this.authorLink = models.flickrPeopleUrl + this.author_id;
        this.mediaLink = `${models.flickrPhotosUrl}/${this.author_id}/${this.id}`;
    }
}

export default FeedItem;