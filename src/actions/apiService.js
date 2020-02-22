import axios from 'axios';
import { toast } from 'react-toastify';
import store from '../store';

class ApiService {
    constructor() {
      let service = axios.create({
        headers: {
          csrf: 'token'}
      });
      service.interceptors.response.use(this.onSuccess, this.onError);
      this.service = service;
    }

    onSuccess(response) {
      return response;
    }
  
    onError = (error) => {
      switch (error.response.status) {
        case 401:
            toast.error('Oops! Authentication Error')
          break;
        case 403:
            toast.error('Rate Limit Exceeded')
        break;
        case 404:
            toast.error('Oops! 404 Error')
          break;
        default:
          toast.error('Oops! Some Internal Error Found')
          break;
      }
      return Promise.reject(error)
    }

    getHeaders = () => {
      const authData = store.getState().authData;

      let headers = {
        'Content-Type': 'application/json',
        'Accept-Version': 'v1',
        'Accept': 'application/json'
      };
      
      if (authData.isAuthorized) {
        headers = {
          ...headers,
          'Authorization': `Bearer ${authData.payload.access_token}`
        }
      }
      return headers;
    }
   
    redirectTo = (document, path) => {
      document.location = path
    }

    get(path, options, callback) {
        return this.service.get(
          path,
          { ...options,
            headers : this.getHeaders()
          })
          .then(
            (response) => callback(response.status, response.data)
        );
    }

    post(path, params, callback) {
      return this.service.post(
        path,
        params,
        { 
          headers : this.getHeaders()
        })
        .then(
          (response) => callback(response.status, response.data)
      );
    }

    delete(path, params, callback){
      return this.service.delete(
        path,
        { 
          headers : this.getHeaders()
        },
        params)
        .then(
          (response) => callback(response.status, response.data)
      );
    }
}

export default new ApiService;