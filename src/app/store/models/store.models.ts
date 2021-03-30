export interface IStore {
  roomFilter?: IRoomFilter;
}

export interface IRoomFilter {
  startDate?: string;
  endDate?: string;
}
