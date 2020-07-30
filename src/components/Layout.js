import React from 'react';
import Header from './Header';

const Login = ({ children }) => (
	<div>
		<Header />
		<div style={{ paddingTop: 5, paddingBottom: 40 }}>{children}</div>
	</div>
);

export default Login;
