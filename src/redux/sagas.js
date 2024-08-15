import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from './userActivitiesSlice';

function* fetchUserActivities() {
  try {
    const response = yield call(axios.get, 'http://52.168.1.54:8080/api/v1/userActivities');
    yield put(fetchDataSuccess(response.data));
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

export default function* rootSaga() {
  yield takeLatest(fetchDataRequest.type, fetchUserActivities);
}
