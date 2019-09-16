import { createStore, applyMiddleware } from 'redux';
import { sagaMiddleware, rootSaga } from "./rootsaga";
import logger from 'redux-logger';

import reducers from './src/rootreducer'; //Import the reducer

// Connect our store to the reducers


export default createStore(reducers, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);