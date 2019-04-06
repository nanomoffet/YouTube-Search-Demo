import { Optional } from '@angular/core';

export interface QueryBuilder {
  toQueryMap: () => Map<string, string>;
  toQueryString: () => string;
}

export class QueryOptions implements QueryBuilder {
  public query: string;
  public type: string;
  public part: string;
  public maxResults: string;
  public order: string;
  public pageToken: string;
  public ids: string[];

  constructor(
    protected partSelection: string,
    @Optional() protected querySelection?: string,
    @Optional() protected typeSelection?: string,
    @Optional() protected maxResultsSelection?: string,
    @Optional() protected orderSelection?: string,
    @Optional() protected pageTokenSelection?: string,
    @Optional() protected idSelection?: string[],

  ) {
    this.query = querySelection;
    this.type = typeSelection;
    this.part = partSelection;
    this.maxResults = maxResultsSelection;
    this.order = orderSelection;
    this.pageToken = pageTokenSelection;
    this.ids = idSelection;
  }

  toQueryMap() {
    const queryMap = new Map<string, string>();
    queryMap.set('part', `${this.part}`);
    if (this.query) {
      queryMap.set('q', `${this.query}`);
    }
    if (this.type) {
      queryMap.set('type', `${this.type}`);
    }
    if (this.maxResults) {
      queryMap.set('maxResults', `${this.maxResults}`);
    }
    if (this.order) {
      queryMap.set('order', `${this.order}`);
    }
    if (this.pageToken) {
      queryMap.set('pageToken', `${this.pageToken}`);
    }
    if (this.ids) {
      queryMap.set('id', `${this.ids}`);
    }

    return queryMap;
  }

  toQueryString() {
    let queryString = '';
    this.toQueryMap().forEach((value: string, key: string) => {
      queryString = queryString.concat(`${key}=${value}&`);
    });

    return queryString.substring(0, queryString.length - 1);
  }
}
