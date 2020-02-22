import { combineReducers } from 'redux';
import photosData from './photosReducer';
import authData from './authReducer';
import { connectRouter } from 'connected-react-router';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    authData,
    photosData
})
  export default createRootReducer