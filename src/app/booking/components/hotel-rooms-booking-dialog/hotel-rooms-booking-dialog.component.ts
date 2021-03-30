import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IRoomBookingDialogData} from 'src/app/booking/models/booking.models';
import {BookingApiService} from 'src/app/booking/services/booking-api/booking-api.service';

@Component({
  selector: 'app-hotel-rooms-booking-dialog',
  templateUrl: './hotel-rooms-booking-dialog.component.html',
  styleUrls: ['./hotel-rooms-booking-dialog.component.css']
})
export class HotelRoomsBookingDialogComponent {
  userFormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl()
  });

  constructor(
    public dialogRef: MatDialogRef<HotelRoomsBookingDialogComponent>,
    private bookingApiService: BookingApiService,
    @Inject(MAT_DIALOG_DATA) public data: IRoomBookingDialogData) {
  }

  onAcceptClick(): void {
    this.bookingApiService.reserveRoom(
      this.data.roomId,
      this.userFormGroup.value.firstName,
      this.userFormGroup.value.lastName,
      this.userFormGroup.value.email,
      {from: (new Date(this.userFormGroup.value.startDate)).toISOString(), to: (new Date(this.userFormGroup.value.endDate)).toISOString()}
    ).subscribe(result => {
      this.dialogRef.close(this.userFormGroup.value);
    });
  }

  onRejectClick(): void {
    this.dialogRef.close();
  }
}
