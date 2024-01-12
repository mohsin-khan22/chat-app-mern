const PORT = require("./server/config").PORT;

module.exports = {
	apps: [
		{
			name: "YOUR APP NAME",
			script: "./app.js",
			instances: "1",
			exec_mode: "cluster",
			watch: true,
			watch_delay: 1000,
			ignore_watch: ["node_modules", "server/public"],
			env: { PORT },
		},
	],
};
