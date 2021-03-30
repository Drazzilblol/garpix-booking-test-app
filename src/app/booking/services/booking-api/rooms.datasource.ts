import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {IRoom, ISearchRoomsResult} from 'src/app/booking/models/booking.models';
import {BookingApiService} from 'src/app/booking/services/booking-api/booking-api.service';
import {IRoomFilter} from 'src/app/store/models/store.models';

export class RoomsDataSource implements DataSource<IRoom> {
  private lessonsSubject = new BehaviorSubject<IRoom[]>([]);

  public totalCount$ = new BehaviorSubject<number | null>(null);

  constructor(private bookingApiService: BookingApiService) {
  }

  connect(collectionViewer: CollectionViewer): Observable<IRoom[]> {
    return this.lessonsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.lessonsSubject.complete();
    this.totalCount$.complete();
  }

  public loadRooms(
    filter: IRoomFilter,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ): void {
    this.bookingApiService.getRooms(filter, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of([]))
      )
      .subscribe((searchResult: ISearchRoomsResult) => {
        this.lessonsSubject.next(searchResult.rooms);
        this.totalCount$.next(searchResult.total);
      });
  }
}
