import ReactDOM from 'react-dom';
import React from 'react';
import SidePanel from './SidePanel.es';

const props = {
	size: 'medium',
	show: false,
	tabs : [
		{
			url: '/api/fake-html',
			pageName: 'Comments',
			slug: 'comments'
		},
		{
			url: '/api/fake-html',
			pageName: 'Edit',
			slug: 'edit'
		},
		{
			url: '/api/fake-html',
			pageName: 'Changelog',
			slug: 'changelog'
		}
	]
}

function App() {
	window.sidePanel = React.useRef(null);
	const onButtonClick = () => {
    window.sidePanel.current.toggle();
  };

	return (<div>
		<SidePanel ref={window.sidePanel} {...props} />
		<button onClick={onButtonClick}>Hook Toggle side panel</button>
	</div>);
}

ReactDOM.render(
	<App />,
	window.document.getElementById('side-panel')
);