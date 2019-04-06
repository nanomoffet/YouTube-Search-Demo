import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryOptions } from './query-options';
import { Serializer } from './serializer';
import { environment } from '../../environments/environment';

export abstract class DataService<T> {

  protected constructor(private http: HttpClient, private url: string, private serializer: Serializer) {
  }

  list(queryOptions: QueryOptions): Observable<T> {
    return this.http
      .get(`${this.url}/?${queryOptions.toQueryString()}&key=${environment.apiKey}`)
      .pipe(map((data: any) => this.convertData(data)));
  }

  protected convertData(data: any): T {
    return this.serializer.fromJson(data);
  }

}
