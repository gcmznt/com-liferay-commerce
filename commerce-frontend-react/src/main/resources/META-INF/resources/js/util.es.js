import React from 'react';
import ReactDOM from 'react-dom';

export function initComponent(Component, componentId, id, props) {
	let instance;
	ReactDOM.render(
		<Component
			ref={el => instance = el}
			{...props}
		/>,
		window.document.getElementById(id)
	);
	if (window.Liferay && window.Liferay.component) {
		window.Liferay.component(componentId, instance);
	}
	return instance;
}