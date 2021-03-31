import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IDateRange, IReservationRoomsResult, ISearchRoomsResult} from 'src/app/booking/models/booking.models';
import {IRoomFilter} from 'src/app/store/models/store.models';

interface IFilterParams {
  [param: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingApiService {

  constructor(private http: HttpClient) {
  }

  /**
   * Получение списка комнат
   */
  getRooms(filter: IRoomFilter, sortOrder: string, pageNumber: number, size: number): Observable<ISearchRoomsResult> {
    const params: IFilterParams = {
      pricePerDay: sortOrder.toUpperCase(),
      offset: (size * pageNumber).toString(),
      size: size.toString()
    };
    if (filter?.endDate) {
      params.to = filter?.endDate;
    }
    if (filter?.startDate) {
      params.from = filter?.startDate;
    }

    return this.http.get<ISearchRoomsResult>('/api/rooms', {
      params
    });
  }

  /**
   * Бронирование комнаты
   */
  reserveRoom(
    roomId: string,
    firstName: string,
    lastName: string,
    email: string,
    dateRange: IDateRange
  ): Observable<IReservationRoomsResult> {
    return this.http.post<IReservationRoomsResult>(`api/rooms/reservation/${roomId}`, {
      user: {
        firstName,
        lastName,
        email
      },
      dateRange
    });
  }
}
