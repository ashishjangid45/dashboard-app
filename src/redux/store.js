import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userActivitiesReducer from './userActivitiesSlice';
import rootSaga from './sagas';


const sagaMiddleware = createSagaMiddleware();


const store = configureStore({
  reducer: {
    userActivities: userActivitiesReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware), 
});


sagaMiddleware.run(rootSaga);

export default store;
