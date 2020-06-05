import 'bootstrap/dist/css/bootstrap.css';
import './styles/main.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import BoardStore from './stores/BoardStore';
import ServerTestStore from './stores/ServerTestStore';

// Create browser history to use in the mobx store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const browserHistory = createBrowserHistory({ basename: baseUrl });
const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);

const boardStore = new BoardStore();
const serverTestStore = new ServerTestStore();

const stores = {
  boardStore,
  routing: routingStore,
  serverTestStore
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
