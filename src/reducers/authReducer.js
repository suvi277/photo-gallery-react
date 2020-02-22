import * as ACTION_TYPES from '../actions/types';

const initialState = {
  isAuthorized: false
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
      case ACTION_TYPES.AUTH_SUCCESS:
      return {
          ...state,
          payload: action.data,
          isAuthorized: true
      };
    default:
      return state;
  }
}