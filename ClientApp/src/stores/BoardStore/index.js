import { action, observable } from 'mobx';
import * as signalR from '@microsoft/signalr';

// board indexes are like reading a book
// [0-8 big squares][0-8 small squares per big square]
export default class BoardStore {
  connection = null;

  @observable board = null;

  @observable focusedSquare = null;

  @observable currentGroup = null;

  @observable groupStatus = null;

  constructor() {
    this.board = new Array(9).fill(new Array(9).fill({ val: undefined, locked: undefined }));
    this.board[0][0] = { val: 4, locked: false };
    this.board[0][1] = { val: 5, locked: true };

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('/boardHub')
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection.on('ReceiveNumber', (...props) => {
      this.receiveNumber(...props);
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
    // this is too early
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
  setFocusedSquare(outerIndex, innerIndex) {
    this.focusedSquare = { outerIndex, innerIndex };
  }

  @action.bound
  setNumber(val) {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(val)) { return; }

    const { outerIndex, innerIndex } = this.focusedSquare;

    if (!this.board[outerIndex][innerIndex].locked) {
      this.board[outerIndex][innerIndex].val = val;
    }

    this.connection
      .invoke('SendNumber', Number(val), outerIndex, innerIndex, this.currentGroup)
      .catch(e => console.log('error = ', e));
  }

  @action.bound
  receiveNumber(val, outerIndex, innerIndex) {
    this.board[outerIndex][innerIndex].val = val;
  }

  // @action.bound
  // updateGroupStatus(status) {
  //   this.groupStatus = status;
  //   console.log(this.groupStatus);
  // }
}
