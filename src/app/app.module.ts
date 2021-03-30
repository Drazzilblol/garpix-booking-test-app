import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HotelRoomsBookingDialogComponent} from 'src/app/booking/components/hotel-rooms-booking-dialog/hotel-rooms-booking-dialog.component';
import {HotelRoomsFilterComponent} from 'src/app/booking/components/hotel-rooms-filter/hotel-rooms-filter.component';
import {HotelRoomsGridComponent} from 'src/app/booking/components/hotel-rooms-grid/hotel-rooms-grid.component';
import {HotelRoomsComponent} from 'src/app/booking/components/hotel-rooms/hotel-rooms.component';
import {addRoomFilterReducer} from 'src/app/store/reducers/booking.reducer';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    HotelRoomsGridComponent,
    HotelRoomsComponent,
    HotelRoomsFilterComponent,
    HotelRoomsBookingDialogComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    StoreModule.forRoot({roomFilter: addRoomFilterReducer}),
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
