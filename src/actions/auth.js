import * as ACTION_TYPES from './types';
import ApiService from './apiService';
import { APP_ID, CLIENT_SECRET, API_CONSTANT, REDIRECT_URI } from '../config';
import { push } from 'connected-react-router';

const authSuccess = (data) => {
	return {
		type: ACTION_TYPES.AUTH_SUCCESS,
		data
	};
};

export const auth = (code) => {
	return (dispatch) => {
		const authData = {
			client_id: APP_ID,
			client_secret: CLIENT_SECRET,
			redirect_uri: REDIRECT_URI,
			code: code,
			grant_type: 'authorization_code'
		};
		ApiService.post(
            API_CONSTANT.auth,
            authData,
            (status, data) => {
			dispatch(authSuccess(data));
			dispatch(push('/photos'));
		});
	};
};
