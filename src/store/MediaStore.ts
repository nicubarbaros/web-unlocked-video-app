import { makeAutoObservable } from "mobx";
import { BehaviorSubject, catchError, map, of } from "rxjs";
import { ajax } from "rxjs/ajax";

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

  constructor() {
    makeAutoObservable(this);

    this.mediaContentSubject.subscribe((mediaList) => {
      this.setMedia(mediaList);
    });

    this.readMediaItemsFromServer();
  }

  addMediaItem(item: MediaItem) {
    this.mediaItems.push(item);
    this.addMediaItemToServer(item);
  }

  setMedia(newMedia: MediaItem[]) {
    this.mediaItems = newMedia;
  }

  removeMediaItem(id: string) {
    this.mediaItems = this.mediaItems.filter((item) => item.id !== id);
    this.removeMediaItemFromServer(id);
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

  get filterMediaByTitle() {
    return (query: string) => {
      return this.mediaItems.filter((item) => item.title.toLowerCase().includes(query.toLocaleLowerCase()));
    };
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
      .subscribe((data) => {});
  }

  readMediaItemsFromServer() {
    ajax
      .getJSON<MediaItem[]>(this.baseUrl)
      .pipe(map((response) => response))
      .subscribe((data) => {
        this.mediaContentSubject.next(data);
      });
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
      .subscribe((data) => {});
  }

  updateMediaItemFromServer(id: string, title: string) {
    ajax
      .patch(`${this.baseUrl}/${id}`, { title })
      .pipe(
        map((response: unknown) => {
          console.log(response);
          return response;
        }),
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe((data) => {});
  }
}
