import * as ACTION_TYPES from '../actions/types';

const initialState = {
  isLoaded: false,
  photos: [],
  query: ''
}

export default function photosReducer(state = initialState, action) {
  switch (action.type) {
      case ACTION_TYPES.REQUEST_UNSPLASH_STARTED:
      return {
          ...state,
          isLoaded: false
      };
      case ACTION_TYPES.REQUEST_UNSPLASH_LOADED:
      return {
          ...state,
          isLoaded: true,
          query: action.query,
          photos: action.data.results ? action.data.results : [...state.photos, ...action.data]
      }
      case ACTION_TYPES.REQUEST_PHOTO_LIKE:
      case ACTION_TYPES.REQUEST_PHOTO_UNLIKE:
      return {
          ...state,
          photos: state.photos.map(photo => {
              return {
                ...photo,
                liked_by_user: photo.id === action.data.photo.id ? action.data.photo.liked_by_user : photo.liked_by_user
              };
          })
      };
    default:
      return state;
  }
}