import { observable, action, makeObservable, get, computed, makeAutoObservable } from "mobx";
import { BehaviorSubject, Subject, catchError, map, mergeMap, of, startWith, switchMap, takeUntil } from "rxjs";
import { AjaxResponse, ajax } from "rxjs/ajax";

export const MediaClassification = ["movie", "tv_show", "game"] as const;

export type MediaClassificationType = (typeof MediaClassification)[number];

export const formatMediaClassification: Record<MediaClassificationType, string> = {
  movie: "Movie",
  tv_show: "TV Show",
  game: "Game",
};

export type MediaItem = {
  id: string;
  title: string;
  classification: MediaClassificationType;
  genre: string;
  releaseYear: number;
  rating: number;
  description: string;
  color: string;
};

export class MediaStore {
  mediaItems: MediaItem[] = [];
  mediaLoading: boolean = false;
  mediaContentSubject = new BehaviorSubject<MediaItem[]>([]);
  private baseUrl = "http://localhost:8000/browse";
  cancelRequest = new Subject();

  constructor() {
    makeAutoObservable(this);

    this.mediaContentSubject.subscribe((mediaList) => {
      this.setMedia(mediaList);
    });

    this.fetchMediaItems();
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

  get getMediaByClassification() {
    return (classification: MediaClassificationType) =>
      this.mediaItems.filter((item) => item.classification === classification);
  }

  get getMediaById() {
    return (mediaId: string) => {
      return this.mediaItems.find((item) => item.id === mediaId);
    };
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
      .pipe(
        map((response) => response),

        catchError((error) => {
          console.error("Error adding media", error);
          return of(error);
        })
      )
      .subscribe((data) => {
        // TODO: Add error handling
        // TODO:save directly to store
        // TODO: if error remove from store
        // TODO: if error show message
        this.fetchMediaItems();
      });
  }

  updateMediaItemTitle(mediaId: string, title: string) {
    this.mediaItems = this.mediaItems.map((item) => {
      if (item.id === mediaId) {
        return {
          ...item,
          title,
        };
      }
      return item;
    });
    this.updateMediaItemFromServer(mediaId, title);
  }
  removeMediaItemFromServer(id: string) {
    ajax
      .delete(`${this.baseUrl}/${id}`)
      .pipe(
        map((response: unknown) => {
          return response;
        }),
        catchError((error) => {
          console.error("Error removing media", error);
          return of(error);
        })
      )
      .subscribe((data) => {
        this.fetchMediaItems();
      });
  }

  updateMediaItemFromServer(id: string, title: string) {
    this.cancelRequest.next(null); // Cancel previous request
    ajax.patch(`${this.baseUrl}/${id}`, { title }).pipe(
      switchMap((response) =>
        of(response).pipe(
          takeUntil(this.cancelRequest) // Cancel the request if a new one is made
        )
      ),
      catchError((error) => {
        console.error("Error updating media item:", error);
        return of(error);
      })
    );
  }
}
