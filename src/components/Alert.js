import React from 'react';

export default function Alert({ type, message }) {
	return (
		<Alert
			style={{ position: 'absolute', top: 0, zIndex: 10 }}
			severity={type}
		>
			{message}
		</Alert>
	);
}
