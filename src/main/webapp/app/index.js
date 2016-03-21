import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import { init } from './actions';

// components
import GuessPage from './components/GuessPage';

const store = configureStore();
const rootElement = document.getElementById('app');

ReactDOM.render((
  <Provider store={store}>
    <GuessPage />
  </Provider>
), rootElement);

store.dispatch(init());
