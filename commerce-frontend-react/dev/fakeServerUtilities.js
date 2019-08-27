/* eslint-disable require-jsdoc */
const faker = require('faker');

function defineServerResponses(app) {
	app.get('/test-endpoint', (_, res) => {
		res.json({
			randomId: faker.random.uuid(),
		});
	});
	app.get('/api/fake-html', (_, res) => {
		res.send(faker.fake("<script>console.log('tab content loaded')</script><p>{{name.lastName}}, {{name.firstName}} {{name.suffix}}</p><button onclick='window.sidePanel.current.toggle()'>Close</button>"));
	});
	app.get('/api/fake-img/:url', (req, res) => {
		res.send(`<img src="${req.params.url}" />`);
	});
}

module.exports = {
	defineServerResponses,
};
