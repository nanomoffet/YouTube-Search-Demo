import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { SearchItem } from './search-item.interface';

// TODO: replace this with real data from your application
const EXAMPLE_DATA: SearchItem[] = [
  {title: 'Hydrogen', description: '', thumb: 'http://www.placehold.it/75x75', commentCount: 50},
  {title: 'Helium', description: '', thumb: 'http://www.placehold.it/75x75', commentCount: 50},
  {title: 'Lithium', description: '', thumb: 'http://www.placehold.it/75x75', commentCount: 50},
  {title: 'Beryllium', description: '', thumb: 'http://www.placehold.it/75x75', commentCount: 50},
  {title: 'Boron', description: '', thumb: 'http://www.placehold.it/75x75', commentCount: 50},
  {title: 'Carbon', description: '', thumb: 'http://www.placehold.it/75x75', commentCount: 50},
  {title: 'Nitrogen', description: '', thumb: 'http://www.placehold.it/75x75', commentCount: 50},
  {title: 'Oxygen', description: '', thumb: 'http://www.placehold.it/75x75', commentCount: 50},
  {title: 'Fluorine', description: '', thumb: 'http://www.placehold.it/75x75', commentCount: 50},
  {title: 'Neon', description: '', thumb: 'http://www.placehold.it/75x75', commentCount: 50},
  {title: 'Sodium', description: '', thumb: 'http://www.placehold.it/75x75', commentCount: 50},
  {title: 'Magnesium', description: '', thumb: 'http://www.placehold.it/75x75', commentCount: 50},
  {title: 'Aluminum', description: '', thumb: 'http://www.placehold.it/75x75', commentCount: 50},
  {title: 'Silicon', description: '', thumb: 'http://www.placehold.it/75x75', commentCount: 50},
  {title: 'Phosphorus', description: '', thumb: 'http://www.placehold.it/75x75', commentCount: 50},
  {title: 'Sulfur', description: '', thumb: 'http://www.placehold.it/75x75', commentCount: 50},
  {title: 'Chlorine', description: '', thumb: 'http://www.placehold.it/75x75', commentCount: 50},
  {title: 'Argon', description: '', thumb: 'http://www.placehold.it/75x75', commentCount: 50},
  {title: 'Potassium', description: '', thumb: 'http://www.placehold.it/75x75', commentCount: 50},
  {title: 'Calcium', description: '', thumb: 'http://www.placehold.it/75x75', commentCount: 50},
];

/**
 * Data source for the Search view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SearchDataSource extends DataSource<SearchItem> {
  data: SearchItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<SearchItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: SearchItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: SearchItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/title columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
