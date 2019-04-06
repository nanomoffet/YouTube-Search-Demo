import { Injectable } from '@angular/core';
import { DataService } from '../../core/data.service';
import { HttpClient } from '@angular/common/http';
import { SearchListResponse } from '../models/search-list-response.interface';
import { SearchListResponseSerializer } from './search-list-response.serializer';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends DataService<SearchListResponse> {

  constructor(http: HttpClient) {
    super(http, 'https://www.googleapis.com/youtube/v3/search', new SearchListResponseSerializer());
  }
}
