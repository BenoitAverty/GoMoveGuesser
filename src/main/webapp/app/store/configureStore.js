import { createStore } from 'redux';

import appReducer from '../reducers';

function configureStore() {
	return createStore(
		appReducer
	);
}

export default configureStore;
