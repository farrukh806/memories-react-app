import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getPosts } from '../../actions/posts';

import useStyles from './styles';

const Home = () => {
	const classes = useStyles();
	const [currentId, setCurrentId] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	return (
		<Grow in>
			<Container>
				<Grid
					container
					justify='space-between'
					align-items='stretch'
					spacing={3}
					className={classes.mainContainer}
				>
					<Grid item xs={12} sm={7}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={12} sm={4}>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
