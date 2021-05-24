import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	ButtonBase,
} from '@material-ui/core';
import moment from 'moment';

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import useStyles from './styles';
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({
	post: {
		selectedFile,
		title,
		message,
		createdAt,
		tags,
		_id,
		name,
		likes,
		creator,
	},
	setCurrentId,
}) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const user = JSON.parse(localStorage.getItem('profile'));

	const Likes = () => {
		if (likes?.length > 0) {
			return likes.find(
				(like) => like === (user?.result?.googleId || user?.result?._id)
			) ? (
				<>
					<ThumbUpAltIcon fontSize='small' />
					&nbsp;
					{likes.length > 2
						? `You and ${likes.length - 1} others`
						: `${likes.length} like${likes.length > 1 ? 's' : ''}`}
				</>
			) : (
				<>
					<ThumbUpAltOutlined fontSize='small' />
					&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
				</>
			);
		}

		return (
			<>
				<ThumbUpAltOutlined fontSize='small' />
				&nbsp;Like
			</>
		);
	};

	const openPost = () => history.push(`/posts/${_id}`);

	return (
		<Card className={classes.card} elevation={5}>
			<ButtonBase className={classes.cardAction} onClick={openPost}>
				<CardMedia
					className={classes.media}
					image={selectedFile}
					title={title}
				/>

				<div className={classes.overlay}>
					<Typography varint='h6'>{name}</Typography>
					<Typography varint='body2'>{moment(createdAt).fromNow()}</Typography>
				</div>
				{(user?.result?.googleId === creator ||
					user?.result?._id === creator) && (
					<div className={classes.overlay2}>
						<Button
							style={{ color: 'white' }}
							size='small'
							onClick={() => {
								setCurrentId(_id);
							}}
						>
							<MoreHorizIcon fontSize='default' />
						</Button>
					</div>
				)}
				<div className={classes.details}>
					<Typography varint='body2' color='textSecondary'>
						{tags.map((tag) => `#${tag} `)}
					</Typography>
				</div>
				<Typography className={classes.title} gutterBottom>
					{title}
				</Typography>
				<CardContent>
					<Typography varint='body2' color='textSecondary' component='p'>
						{message}
					</Typography>
				</CardContent>
			</ButtonBase>
			<CardActions className={classes.cardActions}>
				<Button
					size='small'
					color='primary'
					disabled={!user?.result}
					onClick={() => {
						dispatch(likePost(_id));
					}}
				>
					<Likes />
				</Button>
				{user?.result?.googleId === creator || user?.result?._id === creator ? (
					<Button
						size='small'
						color='primary'
						onClick={() => {
							dispatch(deletePost(_id));
						}}
					>
						<DeleteIcon fontSize='small' />
						Delete
					</Button>
				) : null}
			</CardActions>
		</Card>
	);
};

export default Post;
