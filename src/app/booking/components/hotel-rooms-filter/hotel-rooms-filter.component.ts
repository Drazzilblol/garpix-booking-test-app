import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {IStore} from 'src/app/store/models/store.models';

@Component({
  selector: 'hotel-rooms-filter',
  templateUrl: './hotel-rooms-filter.component.html',
  styleUrls: ['./hotel-rooms-filter.component.css']
})
export class HotelRoomsFilterComponent {
  range = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl()
  });

  constructor(private store: Store<IStore>) {
  }

  onFilterButtonClick(): void {
    this.addRoomFilter((new Date(this.range.value.startDate)).toISOString(), (new Date(this.range.value.endDate)).toISOString());
  }

  private addRoomFilter(startDate: string, endDate: string): void {
    this.store.dispatch({
      type: 'ADD_ROOM_FILTER',
      payload: {
        startDate,
        endDate
      }
    });
  }
}
