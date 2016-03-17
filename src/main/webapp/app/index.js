import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

// components
import GuessPage from './components/GuessPage';


const store = configureStore();
const rootElement = document.getElementById('app');

ReactDOM.render((
  <Provider store={store}>
    <GuessPage />
  </Provider>
), rootElement);
