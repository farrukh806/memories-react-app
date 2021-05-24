import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
	if (localStorage.getItem('profile')) {
		req.headers.authorization = `Bearer ${
			JSON.parse(localStorage.getItem('profile')).token
		}`;
	}
	return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPost = (id) => API.get(`/posts/${id}`);

export const fetchPostsBySearch = (searchQuery) => {
	return API.get(
		`/posts/search?searchQuery=${searchQuery.search || 'none'} &tags=${
			searchQuery.tags
		}`
	);
};

export const createPost = (newPost) => API.post('/posts', newPost);

export const updatePost = (_id, postData) =>
	API.patch(`/posts/${_id}`, postData);

export const deletePost = (_id) => API.delete(`/posts/${_id}`);

export const likePost = (_id) => API.patch(`/posts/${_id}/likePost`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
