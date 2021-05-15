import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { getPosts } from './actions/posts';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './styles';
import memories from './images/memories.png';

const App = () => {
	const classes = useStyles();
	const [currentId, setCurrentId] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	return (
		<Container>
			<AppBar className={classes.appBar} position='static' color='inherit'>
				<Typography variant='h2' align='center' className={classes.heading}>
					Memories
				</Typography>
				<img
					className={classes.image}
					src={memories}
					alt='Memories'
					height='60'
				/>
			</AppBar>
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
		</Container>
	);
};

export default App;
