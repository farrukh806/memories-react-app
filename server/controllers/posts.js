import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
	try {
		const postMessages = await PostMessage.find();

		res.status(200).json(postMessages);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createPosts = async (req, res) => {
	const post = req.body;

	const newPost = new PostMessage(post);
	try {
		await newPost.save();

		res.status(201).json(newPost);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const updatePost = async (req, res) => {
	const postId = req.params.id;
	if (mongoose.Types.ObjectId.isValid(postId)) {
		const postData = req.body;
		try {
			const updatedPost = await PostMessage.findByIdAndUpdate(
				postId,
				postData,
				{ new: true }
			);
			return res.status(200).json(updatedPost);
		} catch (error) {
			return res.status(400).json({ message: error.message });
		}
	} else return res.status(404).json({ message: 'Invalid post ID' });
};

export const deletePost = async (req, res) => {
	const postId = req.params.id;
	if (mongoose.Types.ObjectId.isValid(postId)) {
		try {
			await PostMessage.findByIdAndRemove(postId);
			return res.status(200).json({ message: 'Post deleted successfully' });
		} catch (error) {
			return res.status(400).json({ message: error.message });
		}
	} else return res.status(404).json({ message: 'Invalid post ID' });
};

export const likePost = async (req, res) => {
	const postId = req.params.id;
	if (mongoose.Types.ObjectId.isValid(postId)) {
		try {
			const post = await PostMessage.findById(postId);
			if (post) {
				const updatedPost = await PostMessage.findByIdAndUpdate(
					post._id,
					{ likeCount: (post.likeCount += 1) },
					{ new: true }
				);

				return res.status(200).json(updatedPost);
			}
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	} else return res.status(404).json({ message: 'Invalid post ID' });
};
