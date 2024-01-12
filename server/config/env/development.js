"use strict";
module.exports = {
	backend: "http://localhost:8000",
	frontend: "http://localhost:3000",
	publicPics: "http://http://localhost:8000/uploads/publicPics",
	PORT: 8000,
	MONGODB_URI: "mongodb://127.0.0.1/dbName",
	secret: "secret",
	host: "",
	smtpAuth: {
		user: "dev_Email",
		pass: "dev_Email_Password",
	},
	allowedOrigins: ["http://localhost:3000", "http://localhost:8000"],
};
