import { Injectable } from '@angular/core';
import { DataService } from '../../core/data.service';
import { HttpClient } from '@angular/common/http';
import { VideoListResponse } from '../models/video-list-response.interface';
import { VideoListResponseSerializer } from './video-list-response.serializer';

@Injectable({
  providedIn: 'root'
})
export class VideoService extends DataService<VideoListResponse> {

  constructor(http: HttpClient) {
    super(http, 'https://www.googleapis.com/youtube/v3/videos', new VideoListResponseSerializer());
  }
}
