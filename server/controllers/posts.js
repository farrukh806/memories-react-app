import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
	try {
		const postMessages = await PostMessage.find();
		res.status(200).json(postMessages);
	} catch (error) {
		console.log(error.message);
		res.status(404).json({ message: error.message });
	}
};

export const createPosts = async (req, res) => {
	const post = req.body;

	const newPost = new PostMessage({
		...post,
		creator: req.userId,
		createdAt: new Date().toISOString(),
	});
	try {
		await newPost.save();

		res.status(201).json(newPost);
	} catch (error) {
		console.log(error.message);
		res.status(409).json({ message: error.message });
	}
};

export const updatePost = async (req, res) => {
	const postId = req.params.id;
	if (mongoose.Types.ObjectId.isValid(postId)) {
		const postData = req.body;
		const post = await PostMessage.findById(postId);
		if (post.creator === req.userId) {
			try {
				const updatedPost = await PostMessage.findByIdAndUpdate(
					postId,
					postData,
					{ new: true }
				);
				return res.status(200).json(updatedPost);
			} catch (error) {
				console.log(error.message);
				return res.status(400).json({ message: error.message });
			}
		} else {
			res
				.status(403)
				.json({ message: 'Forbidden! Current user is not the creator' });
		}
	} else return res.status(404).json({ message: 'Invalid post ID' });
};

export const deletePost = async (req, res) => {
	const postId = req.params.id;
	if (mongoose.Types.ObjectId.isValid(postId)) {
		try {
			if (req.userId) {
				const { creator } = await PostMessage.findById(postId);
				if (creator) {
					if (req.userId === creator) {
						await PostMessage.findByIdAndRemove(postId);
						return res
							.status(200)
							.json({ message: 'Post deleted successfully' });
					} else {
						res.status(403).json({ message: 'Forbidden!' });
					}
				} else {
					res.status(404).json({ message: 'Post not found' });
				}
			} else {
				res.status(401).json({ message: 'Unauthenticated' });
			}
		} catch (error) {
			console.log(error.message);
			return res.status(400).json({ message: error.message });
		}
	} else return res.status(404).json({ message: 'Invalid post ID' });
};

export const likePost = async (req, res) => {
	const postId = req.params.id;

	if (!req.userId) return res.status(403).json({ message: 'Unauthenticated!' });

	if (mongoose.Types.ObjectId.isValid(postId)) {
		try {
			const post = await PostMessage.findById(postId);

			const index = post.likes.findIndex((id) => id === String(req.userId));

			if (index === -1) {
				post.likes.push(req.userId);
			} else {
				post.likes = post.likes.filter((id) => id !== String(req.userId));
			}
			const updatedPost = await PostMessage.findByIdAndUpdate(post._id, post, {
				new: true,
			});
			return res.status(200).json(updatedPost);
		} catch (error) {
			console.log(error.message);
			res.status(400).json({ message: error.message });
		}
	} else return res.status(404).json({ message: 'Invalid post ID' });
};
