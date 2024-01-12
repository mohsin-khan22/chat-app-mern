let express = require("express");
const mongoose = require("mongoose");
const { allowedOrigins, PORT } = require("./server/config");

require("dotenv").config();

// Create global app object
let app = express();

require("./server/app-config")(app);

// finally, let's start our server...
let server = app.listen(process.env.PORT || PORT, function () {
	console.log("Listening on port " + server.address().port);
});

global.app_name_Socket = require("socket.io")(server, {
	cors: {
		credentials: true,
		origin: function (origin, callback) {
			// allow requests with no origin
			// (like mobile apps or curl requests)
			// console.log("ORIGIN", origin);
			if (!origin) return callback(null, true);
			if (allowedOrigins.indexOf(origin) === -1) {
				var msg = "The CORS policy for this site does not " + "allow access from the specified Origin.";
				return callback(new Error(msg), false);
			}
			return callback(null, true);
		},
	},
});

app_name_Socket.on("connection", (socket) => {
	console.log("a user connected");

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

process.on("SIGTERM", () => {
	console.info("SIGTERM signal received.");
	console.log("Closing http server.");

	server.close(() => {
		console.log("Http server closed.");
		// boolean means [force], see in mongoose doc
		mongoose.connection.close(false, () => {
			console.log("MongoDb connection closed.");
			process.kill(process.pid, "SIGTERM");
			process.exit(0);
		});
	});
});
process.once("SIGUSR2", function () {
	server.close(() => {
		console.log("Http server closed.");
		// boolean means [force], see in mongoose doc
		mongoose.connection.close(false, () => {
			console.log("MongoDb connection closed.");
			process.kill(process.pid, "SIGUSR2");
			process.exit(0);
		});
	});
});

process.on("SIGINT", function () {
	// this is only called on ctrl+c, not restart
	server.close(() => {
		console.log("Http server closed.");
		// boolean means [force], see in mongoose doc
		mongoose.connection.close(false, () => {
			console.log("MongoDb connection closed.");
			process.kill(process.pid, "SIGINT");

			process.exit(0);
		});
	});
});
