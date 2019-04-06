import { Video } from './video.interface';

export interface VideoListResponse {
  kind: 'youtube#videoListResponse';
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number
  };
  items: Video[];
}
