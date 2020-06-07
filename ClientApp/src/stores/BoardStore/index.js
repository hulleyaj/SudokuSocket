import { action, observable } from 'mobx';
import * as signalR from '@microsoft/signalr';

// board indexes are like reading a book
// [0-8 big squares][0-8 small squares per big square]
export default class BoardStore {
  connection = null;

  @observable board = null;

  @observable currentGroup = null;

  @observable groupStatus = null;

  constructor() {
    this.board = new Array(9).fill(new Array(9));
    this.board[0] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('/boardHub')
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection.on('ReceiveNumber', (user, number) => {
      this.receiveNumber(number);
    });

    this.connection.on('UpdateGroupStatus', status => {
      this.updateGroupStatus(status);
    });
  }

  @action.bound
  async createBoard() {
    this.currentBoardId = 'lol';
  }

  @action.bound
  async joinBoard(name) {
    //this is too early
    this.currentGroup = name;

    try {
      await this.connection.start();

      this.connection
        .invoke('AddToGroup', name)
        .catch(e => console.log('addtogroup error = ', e));
    } catch (e) {
      console.log('error = ', e);
    }
  }

  @action.bound
  setNumber(val, outerIndex, innerIndex) {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(val)) { return; }

    this.board[outerIndex][innerIndex] = val;
    console.log(`setting [${outerIndex}][${innerIndex}] to ${val}`);
    // this.connection
    //   .invoke('SendNumber', 'lol', 5, this.currentGroup)
    //   .catch(e => console.log('error = ', e));
  }

  @action.bound
  receiveNumber(number) {
    console.log('number received = ', number);
  }

  // @action.bound
  // updateGroupStatus(status) {
  //   this.groupStatus = status;
  //   console.log(this.groupStatus);
  // }
}
