import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
	title: { type: String, required: true },
	message: { type: String, required: true },
	name: String,
	creator: String,
	tags: [{ type: String, required: true }],
	selectedFile: { type: String, required: true },
	likes: {
		type: [String],
		default: [],
	},

	createdAt: {
		type: Date,
		default: new Date(),
	},
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
