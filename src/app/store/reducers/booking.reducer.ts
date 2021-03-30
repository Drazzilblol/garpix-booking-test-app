import {IStore} from 'src/app/store/models/store.models';

export const ADD_ROOM_FILTER = 'ADD_ROOM_FILTER';

export function addRoomFilterReducer(store: IStore, action): any {
  switch (action.type) {
    case ADD_ROOM_FILTER:
      return action.payload;
    default:
      return store;
  }
}
