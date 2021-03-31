export interface IRoom {
  id: string;
  roomType: string;
  number: number;
  pricePerDay: number;
}

export interface ISearchRoomsResult {
  rooms: IRoom[];
  total: number;
}

export interface IReservationRoomsResult {
  bookingId: string;
}

export interface IRoomBookingDialogData {
  roomId: string;
}

export interface IDateRange {
  from: string;
  to: string;
}


