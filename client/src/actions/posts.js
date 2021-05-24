import * as api from '../api';
import {
	FETCH_ALL,
	FETCH_POST,
	LIKE,
	UPDATE,
	DELETE,
	CREATE,
	FETCH_BY_SEARCH,
	START_LOADING,
	END_LOADING,
} from '../constants/actionTypes';

export const getPosts = (page) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.fetchPosts(page);
		const action = {
			type: FETCH_ALL,
			payload: data,
		};
		dispatch(action);
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.error(error.message);
	}
};

export const getPost = (id) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.fetchPost(id);
		const action = {
			type: FETCH_POST,
			payload: data,
		};
		dispatch(action);
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const {
			data: { data },
		} = await api.fetchPostsBySearch(searchQuery);
		console.log(data);
		const action = {
			type: FETCH_BY_SEARCH,
			payload: data,
		};
		dispatch(action);
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
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
