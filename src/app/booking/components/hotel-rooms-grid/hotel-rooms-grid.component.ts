import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {select, Store} from '@ngrx/store';
import {merge} from 'rxjs';
import {tap} from 'rxjs/operators';
import {HotelRoomsBookingDialogComponent} from 'src/app/booking/components/hotel-rooms-booking-dialog/hotel-rooms-booking-dialog.component';
import {IRoom} from 'src/app/booking/models/booking.models';
import {BookingApiService} from 'src/app/booking/services/booking-api/booking-api.service';
import {RoomsDataSource} from 'src/app/booking/services/booking-api/rooms.datasource';
import {IRoomFilter, IStore} from 'src/app/store/models/store.models';
import {selectRoomFilter} from 'src/app/store/selectors';

@Component({
  selector: 'hotel-rooms-grid',
  templateUrl: './hotel-rooms-grid.component.html',
  styleUrls: ['./hotel-rooms-grid.component.css']
})
export class HotelRoomsGridComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private bookingApiService: BookingApiService, private store: Store<IStore>, public dialog: MatDialog) {
  }

  displayedColumns = ['number', 'roomType', 'pricePerDay'];
  dataSource = new RoomsDataSource(this.bookingApiService);

  ngAfterViewInit(): void {
    this.store.pipe(select(selectRoomFilter)).subscribe(filter => {
      this.loadLessonsPage(filter);
    });

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.dataSource = new RoomsDataSource(this.bookingApiService);

    this.dataSource.loadRooms(null, 'asc', 0, 5);
  }

  loadLessonsPage(filter?: IRoomFilter): void {
    this.dataSource.loadRooms(
      filter,
      this.sort.direction || 'asc',
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  /**
   * Диалог резервации комнаты
   */
  openBookingDialog(room: IRoom): void {
    console.log(room);
    const dialogRef = this.dialog.open(HotelRoomsBookingDialogComponent, {
      width: '300px',
      data: {roomId: room.roomId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.loadRooms(null, 'asc', 0, 5);
      }
    });
  }
}
