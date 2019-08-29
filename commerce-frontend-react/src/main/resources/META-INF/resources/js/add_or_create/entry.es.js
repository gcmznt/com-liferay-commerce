import React from 'react';
import ReactDOM from 'react-dom';
import AddOrCreate from './AddOrCreate.es';

export default function(componentId, id, props) {
	const portletFrame = window.document.getElementById(id);
	let instance = null;
	ReactDOM.render(
		<AddOrCreate
			ref={component => {
				instance = component;
			}}
			{...props}
		/>,
		portletFrame
	);
	if (window.Liferay && window.Liferay.component) {
		window.Liferay.component(componentId, instance);
	}
	return instance;
}