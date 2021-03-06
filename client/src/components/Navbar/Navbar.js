import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import decode from 'jwt-decode';
import useStyles from './styles';
import memoriesLogo from '../../images/memories.png';
import memoriesText from '../../images/memories-Text.png';

const Navbar = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

	const handleLogout = () => {
		const action = { type: 'LOGOUT' };
		dispatch(action);
		history.push('/');
		setUser(null);
	};

	useEffect(() => {
		const token = user?.token;

		if (token) {
			const decodedToken = decode(token);

			if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
		}

		setUser(JSON.parse(localStorage.getItem('profile')));
		// eslint-disable-next-line
	}, [location]);

	return (
		<AppBar className={classes.appBar} position='static' color='inherit'>
			<Link to='/' className={classes.brandContainer}>
				<img src={memoriesText} alt='MemoriesLogo' height="45px" />
				<img
					className={classes.image}
					src={memoriesLogo}
					alt='Memories'
					height='40px'
				/>
			</Link>
			<Toolbar className={classes.toolbar}>
				{user ? (
					<div className={classes.profile}>
						<Avatar
							className={classes.purple}
							alt={user.result.name}
							src={user.result.imageUrl}
						>
							{user.result.name.charAt(0)}
						</Avatar>
						<Typography className={classes.userName} variant='h6'>
							{user.result.name}
						</Typography>
						<Button
							variant='contained'
							className={classes.logout}
							color='secondary'
							onClick={handleLogout}
						>
							Logout
						</Button>
					</div>
				) : (
					<Button
						component={Link}
						to='/auth'
						variant='contained'
						color='primary'
					>
						Sign in
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
