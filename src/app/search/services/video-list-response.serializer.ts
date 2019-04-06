import { Video } from '../models/video.interface';

export class VideoListResponseSerializer {
  fromJson(json: any) {
    return {
      kind: 'youtube#videoListResponse',
    etag: json.etag,
    nextPageToken: json.nextPageToken,
    prevPageToken: json.prevPageToken,
    pageInfo: json.pageInfo,
    items: json.items
    };
  }
}
