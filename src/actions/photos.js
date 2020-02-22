import * as ACTION_TYPES from "./types";
import { APP_ID, API_CONSTANT } from "../config";
import ApiService from "./apiService";

const defaultOptions = {
  per_page: 15
};

const requestUnsplashStarted = () => {
  return {
    type: ACTION_TYPES.REQUEST_UNSPLASH_STARTED
  };
};

const requestUnsplashLoaded = (data, query) => {
  return {
    type: ACTION_TYPES.REQUEST_UNSPLASH_LOADED,
    data,
    query
  };
};

const requestPhotoLike = (data, query) => {
  return {
    type: ACTION_TYPES.REQUEST_PHOTO_LIKE,
    data
  };
};

const requestPhotoUnlike = (data, query) => {
  return {
    type: ACTION_TYPES.REQUEST_PHOTO_UNLIKE,
    data
  };
};

export const fetchPhotos = options => {
  return dispatch => {
    dispatch(requestUnsplashStarted());
    return ApiService.get(
      API_CONSTANT.photos,
      { params: { ...defaultOptions, ...options } },
      (status, data) => {
        dispatch(requestUnsplashLoaded(data));
      }
    );
  };
};

export const searchPhotos = options => {
  return dispatch => {
    return ApiService.get(
      API_CONSTANT.searchPhotos,
      { params: { ...defaultOptions, ...options } },
      (status, data) => {
        dispatch(requestUnsplashLoaded(data, options.query));
      }
    );
  };
};

export const likePhoto = id => {
  return dispatch => {
    return ApiService.post(
      API_CONSTANT.photos + id + '/like',
      null,
      (status, data) => {
        dispatch(requestPhotoLike(data));
      }
    );
  };
};

export const unlikePhoto = id => {
  return dispatch => {
    return ApiService.delete(
      API_CONSTANT.photos + id + '/like',
      null,
      (status, data) => {
        dispatch(requestPhotoUnlike(data));
      }
    );
  };
};
