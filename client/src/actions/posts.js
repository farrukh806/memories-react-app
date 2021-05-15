import * as api from '../api';
import {
	FETCH_ALL,
	LIKE,
	UPDATE,
	DELETE,
	CREATE,
} from '../constants/actionTypes';
export const getPosts = () => async (dispatch) => {
	try {
		const { data } = await api.fetchPosts();

		const action = {
			type: FETCH_ALL,
			payload: data,
		};

		dispatch(action);
	} catch (error) {
		console.error(error.message);
	}
};

export const createPost = (post) => async (dispatch) => {
	try {
		const { data } = await api.createPost(post);
		const action = {
			type: CREATE,
			payload: data,
		};
		dispatch(action);
	} catch (error) {
		console.error(error);
	}
};

export const updatePost = (_id, postData) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(_id, postData);
		const action = {
			type: UPDATE,
			payload: data,
		};
		dispatch(action);
	} catch (error) {
		console.error(error.message);
	}
};

export const deletePost = (_id) => async (dispatch) => {
	try {
		await api.deletePost(_id);
		const action = {
			type: DELETE,
			payload: _id,
		};
		dispatch(action);
	} catch (error) {
		console.error(error.message);
	}
};

export const likePost = (_id) => async (dispatch) => {
	try {
		const { data } = await api.likePost(_id);
		const action = {
			type: LIKE,
			payload: data,
		};
		dispatch(action);
	} catch (error) {
		console.error(error.message);
	}
};
