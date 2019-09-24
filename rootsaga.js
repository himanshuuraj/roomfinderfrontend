import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import homeSaga from "./src/saga/homeSaga";

export const sagaMiddleware = createSagaMiddleware();

export function* rootSaga() {
  yield all([
      ...homeSaga
  ]);
}