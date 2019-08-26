import ReactDOM from 'react-dom';
import React from 'react';
import Gallery from './Gallery.es';
import Zoom from './Zoom.es';

const props = {
	images: ['#1abc9c', '#2ecc71', '#3498db', '#f1c40f', '#e67e22', '#e74c3c', '#9b59b6', '#34495e', '#95a5a6'].map(c => ({
		id: c.slice(1),
		url: `https://via.placeholder.com/200/${c.slice(1)}?text=%20`,
	})),
}

function App() {
	const gallery = React.useRef();

	return <Gallery ref={gallery} {...props} />;
}

ReactDOM.render(
	<App />,
	window.document.getElementById('gallery')
);