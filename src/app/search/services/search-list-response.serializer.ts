import { SearchListResponse } from '../models/search-list-response.interface';

export class SearchListResponseSerializer {

  fromJson(json: any): SearchListResponse {
    return {
      kind: json.kind,
      etag: json.etag,
      regionCode: json.regionCode,
      nextPageToken: json.nextPageToken,
      prevPageToken: json.prevPageToken,
      pageInfo: json.pageInfo,
      items: json.items
    };
  }
}
