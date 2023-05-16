import { CHANGE_APP_MODE } from './../actions/actionTypes';
import { call, put } from "redux-saga/effects"

export default function* (action: any) {
    // console.log("Saga 123: " + JSON.stringify(action));
    // yield put({ type: CHANGE_APP_MODE, payload: action.payload });
}