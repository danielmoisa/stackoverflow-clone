import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import Layout from '../components/Layout';
import Signup from '../pages/Signup';
import Questions from '../pages/Questions';
import { auth } from './firebase';
import Login from '../pages/Login';
import CircularProgress from '@material-ui/core/CircularProgress';
import Question from '../pages/Question';
import AddQuestion from '../pages/AddQuestion';

function PrivateRoute({ component: Component, authenticated, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) =>
				authenticated === true ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/signup',
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) =>
				authenticated === false ? (
					<Component {...props} />
				) : (
					<Redirect to="/" />
				)
			}
		/>
	);
}

function Routes() {
	const [authState, setAuthState] = useState({
		authenticated: false,
		loading: true,
	});

	useEffect(() => {
		auth().onAuthStateChanged((user) => {
			if (user) {
				setAuthState({
					...authState,
					authenticated: true,
					loading: false,
				});
			} else {
				setAuthState({
					...authState,
					authenticated: false,
					loading: false,
				});
			}
		});
	}, []);

	return authState.loading === true ? (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}>
			<CircularProgress color="primary" />
		</div>
	) : (
		<Router>
			<Layout>
				<Switch>
					<PublicRoute
						path="/signup"
						authenticated={authState.authenticated}
						component={Signup}></PublicRoute>
					<PublicRoute
						path="/login"
						authenticated={authState.authenticated}
						component={Login}
					/>
					<PrivateRoute
						exact
						path="/"
						authenticated={authState.authenticated}
						component={Questions}></PrivateRoute>
					<PrivateRoute
						path="/question"
						authenticated={authState.authenticated}
						component={Question}></PrivateRoute>

					<PrivateRoute
						path="/questions/:id"
						authenticated={authState.authenticated}
						component={Question}></PrivateRoute>

					<PrivateRoute
						exact
						path="/add-question"
						authenticated={authState.authenticated}
						component={AddQuestion}></PrivateRoute>
				</Switch>
			</Layout>
		</Router>
	);
}

export default Routes;
