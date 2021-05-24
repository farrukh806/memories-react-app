import { useState, useEffect } from 'react';
import { TextField, Typography, Button, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
	const post  = useSelector((state) =>
		currentId ? state.posts.find((p) => p._id === currentId) : null
	);

	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem('profile'));

	const classes = useStyles();

	const [postData, setPostData] = useState({
		title: '',
		message: '',
		tags: '',
		selectedFile: '',
	});

	useEffect(() => {
		if (post) {
			setPostData(post);
		}
	}, [post]);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (currentId) {
			dispatch(
				updatePost(currentId, { ...postData, name: user?.result?.name })
			);
		} else {
			dispatch(createPost({ ...postData, name: user?.result?.name }));
		}
		clear();
	};

	const clear = () => {
		setCurrentId(null);
		setPostData({ title: '', message: '', tags: '', selectedFile: '' });
	};

	if (!user?.result?.name) {
		return (
			<Paper className={classes.paper}>
				<Typography variant='h5' align='center'>
					Please Sign In to create your own memory and like other's memories
				</Typography>
			</Paper>
		);
	}
	return (
		<Paper className={classes.paper} elevation={6}>
			<form
				autoComplete='off'
				noValidate
				className={`${classes.root} ${classes.form}`}
				onSubmit={handleSubmit}
			>
				<Typography variant='h6'>
					{currentId ? 'Update' : 'Create'} a Memory
				</Typography>
				<TextField
					name='title'
					variant='outlined'
					required
					label='Title'
					fullWidth
					value={postData.title}
					onChange={(e) => setPostData({ ...postData, title: e.target.value })}
				/>
				<TextField
					name='message'
					variant='outlined'
					required
					label='Message'
					fullWidth
					value={postData.message}
					multiline
					rows={4}
					onChange={(e) =>
						setPostData({ ...postData, message: e.target.value })
					}
				/>
				<TextField
					name='tags'
					variant='outlined'
					required
					label='Tags (separated by coma)'
					fullWidth
					value={postData.tags}
					placeholder='Tags(separated by coma)'
					onChange={(e) =>
						setPostData({ ...postData, tags: e.target.value.split(',') })
					}
				/>
				<div className={classes.fileInput}>
					<FileBase
						type='file'
						name='selectedFile'
						required
						multiple={false}
						onDone={({ base64 }) =>
							setPostData({ ...postData, selectedFile: base64 })
						}
					/>
				</div>
				<Button
					className={classes.buttonSubmit}
					variant='contained'
					color='primary'
					size='large'
					type='submit'
					fullWidth
				>
					Submit
				</Button>
				<Button
					variant='contained'
					color='secondary'
					size='small'
					fullWidth
					onClick={clear}
				>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
