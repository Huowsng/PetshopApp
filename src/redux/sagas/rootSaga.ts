import { CHANGE_APP_MODE } from './../actions/actionTypes';
import { all, takeEvery, takeLatest } from "redux-saga/effects"
import appSaga from "./appSaga"
const rootSaga = function* () {
    yield all([takeEvery(CHANGE_APP_MODE, appSaga)])
}

export default rootSaga;