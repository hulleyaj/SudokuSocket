import 'bootstrap/dist/css/bootstrap.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ServerTestStore from './stores/ServerTestStore';

// Create browser history to use in the mobx store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const browserHistory = createBrowserHistory({ basename: baseUrl });
const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);

const serverTestStore = new ServerTestStore();

const stores = {
  routing: routingStore,
  serverTest: serverTestStore
};

ReactDOM.render(
  <Provider { ...stores }>
    <Router history={ history }>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
