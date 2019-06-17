const config = {
	host: '10.86.52.104',
	port: 3333,
	getURL(...pathSegments) {
		let path = '';
		if (pathSegments.length > 0) {
			path = '/' + pathSegments.join('/', path);
		}

		return `http://${this.host}:${this.port}${path}`;
	}
};

export default config;
