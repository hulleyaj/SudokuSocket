import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import ServerTest from './pages/ServerTest';
import './custom.css';

export default () => (
  <Layout>
    <Route exact path="/" component={ Home } />
    <Route path="/server-test" component={ ServerTest } />
  </Layout>
);
