import { observable, action, makeObservable, get, computed, makeAutoObservable } from "mobx";
import { BehaviorSubject, catchError, map, mergeMap, of, startWith } from "rxjs";
import { AjaxResponse, ajax } from "rxjs/ajax";

export type MediaItem = {
  id: string;
  title: string;
  type: "Movie" | "TV Show" | "Game";
  classification: "movie" | "tv_show" | "game";
  genre: string;
  releaseYear: number;
  rating: number;
};

class MediaStore {
  mediaItems: MediaItem[] = [];
  mediaLoading: boolean = false;
  mediaContentSubject = new BehaviorSubject<MediaItem[]>([]);
  private baseUrl = "http://localhost:8000/browse";

  constructor() {
    makeAutoObservable(this);

    this.mediaContentSubject.subscribe((mediaList) => {
      this.setMedia(mediaList);
    });
  }

  addMediaItem(item: MediaItem) {
    this.mediaItems.push(item);
  }

  setMedia(newMedia: MediaItem[]) {
    this.mediaItems = newMedia;
  }

  removeMediaItem(id: string) {
    this.mediaItems = this.mediaItems.filter((item) => item.id !== id);
  }

  get totalItems() {
    return this.mediaItems.length;
  }

  get itemsByCategory() {
    return this.mediaItems.reduce((acc: Record<string, MediaItem[]>, item) => {
      const category = item.classification;
      console.log(category);
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
  }

  fetchMediaItems() {
    ajax
      .getJSON<MediaItem[]>(this.baseUrl)
      .pipe(map((response) => response))
      .subscribe((data) => {
        this.mediaContentSubject.next(data);
      });
  }

  addMediaItemToServer(item: MediaItem) {
    ajax
      .post(this.baseUrl, item, {
        "Content-Type": "application/json",
      })
      .pipe(map((response) => response))
      .subscribe((data) => {
        // TODO: Add error handling
        // TODO:save directly to store
        // TODO: if error remove from store
        // TODO: if error show message
        this.fetchMediaItems();
      });
  }

  removeMediaItemFromServer(id: string) {
    ajax
      .delete(`${this.baseUrl}/${id}`)
      .pipe(
        map((response: unknown) => {
          return response;
        })
      )
      .subscribe((data) => {
        console.log(data);
        this.fetchMediaItems();
      });
  }
}

const store = new MediaStore();
export default store;
