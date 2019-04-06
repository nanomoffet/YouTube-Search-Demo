import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { SearchDataSource } from './services/search-datasource';
import { SearchResult } from './models/search-result.interface';
import { SearchListResponse } from './models/search-list-response.interface';
import { SearchService } from './services/search.service';
import { QueryOptions } from '../core/query-options';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { VideoService } from './services/video.service';
import { Video } from './models/video.interface';
import { VideoListResponse } from './models/video-list-response.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: SearchDataSource;
  searchResults: SearchResult[];
  total: number;
  pageIndex = 0;
  previousPageIndex = 0;
  prevPageToken: string;
  nextPageToken: string;
  pageToken: string;
  pageSize = 10;
  params: QueryOptions;
  order = 'date';
  query: string;
  queryChanged: Subject<string> = new Subject<string>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'description', 'thumbnail', 'comments'];

  constructor(private searchService: SearchService, private videoService: VideoService) {
    this.queryChanged
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(query => {
      this.query = query;
      this.updateData();
    });
  }

  onPageEvent(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.previousPageIndex = event.previousPageIndex;

    if (this.previousPageIndex < this.pageIndex) {
      this.pageToken = this.nextPageToken;
    }

    if (this.previousPageIndex > this.pageIndex) {
      this.pageToken = this.prevPageToken;
    }

    this.updateData();
  }

  onQueryChanged(text: string) {
    this.queryChanged.next(text);
  }

  onOrderChange(event) {
    this.order = event.value;

    this.updateData();
  }

  onClearQuery() {
    this.query = '';
    this.dataSource = new SearchDataSource(this.paginator, this.sort, [], 0, 0, this.pageSize);
  }

  updateParams() {
    this.params = new QueryOptions(
      'snippet',
      this.query,
      'video',
      `${this.pageSize}`,
      this.order,
      this.pageToken);
  }

  updateData() {
    this.updateParams();

    if (this.query !== '') {

      this.searchService.list(this.params).subscribe((response: SearchListResponse) => {
        this.total = response.pageInfo.totalResults;
        this.searchResults = response.items;
        this.prevPageToken = response.prevPageToken;
        this.nextPageToken = response.nextPageToken;
        const ids = [];

        this.searchResults.forEach(video => {
          ids.push(video.id.videoId);
        });

        const videoParams = new QueryOptions(
          'snippet, statistics', null, null, null, null, null, ids
        );
        this.videoService.list(videoParams).subscribe((videoResponse: VideoListResponse) => {
          this.searchResults.forEach(result => {
            result.commentCount = videoResponse.items[this.searchResults.indexOf(result)].statistics.commentCount;
          });
        });

        this.dataSource = new SearchDataSource(this.paginator, this.sort, this.searchResults, this.total, this.pageIndex, this.pageSize);
        console.log(this.searchResults);
      });
    }
  }
}
