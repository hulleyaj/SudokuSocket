import { action, observable } from 'mobx';
import { headers } from '../network';

export default class ServerTestStore {
  @observable loading = false;

  @observable status = '';

  @action.bound
  async pingServer() {
    this.reset();
    this.loading = true;

    const request = new Request('info/health', {
      headers,
      method: 'GET'
    });

    try {
      const response = await fetch(request);

      if (response.status === 200) {
        const { status } = await response.json();

        this.status = status;
      } else {
        this.status = 'Server is down';
      }
    } catch (e) {
      this.status = 'Something went wrong';
    }

    this.loading = false;
  }

  @action.bound
  reset() {
    this.loading = false;
    this.status = '';
  }
}
