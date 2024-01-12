let mongoose = require("mongoose");
let router = require("express").Router();
let passport = require("passport");
let User = mongoose.model("User");
let auth = require("../auth");
let { OkResponse, BadRequestResponse, UnauthorizedResponse } = require("express-http-response");
let { sendEmail } = require("../../utilities/nodemailer");
const { backend } = require("../../config");

//get user from email address
router.param("email", (req, res, next, email) => {
	User.findOne({ email }, (err, user) => {
		if (err) return next(new BadRequestResponse(err));
		if (!user) return next(new BadRequestResponse("User not found!", 423));
		req.userToUpdate = user;
		return next();
	});
});

router.get("/context", auth.required, auth.user, (req, res, next) => {
	return next(new OkResponse(req.user.toAuthJSON()));
});

router.post("/login", (req, res, next) => {
	passport.authenticate("local", { session: false }, function (err, user, info) {
		if (err) return next(new BadRequestResponse(err.message));
		if (!user) return next(new BadRequestResponse(`Either incorrect username/password or user does not exist.`, 423));
		if (!user.isEmailVerified) return next(new BadRequestResponse("Your email has been not verified", 403));
		if (user.status === "inactive") return next(new UnauthorizedResponse("Your account is inactive", 402));

		return next(new OkResponse({ user: user.toAuthJSON() }));
	})(req, res, next);
});

router.post("/signup", (req, res, next) => {
	User.findOne({ email: req.body.email }, (err, res) => {
		if (err) return next(new BadRequestResponse(err));
		if (res) return next(new BadRequestResponse("User already exists", 423));

		let user = new User();
		user.email = req.body.email;
		user.setPassword(req.body.password);
		user.generateMailToken();
		user.save((err, res) => {
			if (err) return next(new BadRequestResponse(err));
			sendEmail(user, "Verify Email", { verifyEmail: true });
			return next(new OkResponse({ user: user.toAuthJSON() }));
		});
	});
});

router.post("/forgot/email", function (req, res, next) {
	if (!req.body.email) return next(new BadRequestResponse("Missing required parameter.", 422.0));

	User.findOne({ email: req.body.email }, (err, user) => {
		if (err) return next(new BadRequestResponse(err));
		if (!user) return next(new BadRequestResponse("User does not exist.", 422.0));
		user.generatePasswordRestToken();
		user.otpExpires = Date.now() + 1800000; // 30 mins
		user.save((err, user) => {
			if (err) return next(new BadRequestResponse(err));
			sendEmail(user, "Forgot Email", { forgetEmail: true });
			return next(new OkResponse({ message: "Forgot Email sent successfully" }));
		});
	});
});

router.post("/set-new-password/:_id/:resetPasswordToken", (req, res, next) => {
	if (
		req.userToUpdate.resetPasswordToken === req.params.resetPasswordToken &&
		req.userToUpdate.otpExpires > Date.now()
	) {
		if (!req.body.password || req.body.password == "")
			return next(new BadRequestResponse("Missing Required Parameters", 422));
		req.userToUpdate.setPassword(req.body.password);
		req.userToUpdate.save(function (err) {
			if (err) return next(new BadRequestResponse(err));
			return next(new OkResponse({ message: "Password has been changed successfully", role: req.userToUpdate.role }));
		});
	} else return next(new BadRequestResponse("Invalid OTP"));
});

router.put("/update-password", auth.required, auth.user, (req, res, next) => {
	if (!req.body.oldPassword || !req.body.password)
		return next(new BadRequestResponse("Missing Required Parameters", 422));

	if (req.body.oldPassword.length <= 0 || req.body.password.length <= 0)
		return next(new BadRequestResponse("Missing Required Parameters", 422));

	if (req.body.oldPassword === req.body.password)
		return next(new BadRequestResponse("Old password and new password cannot be same", 422));

	if (req.user.validPassword(req.body.oldPassword)) {
		req.user.setPassword(req.body.password);
		req.user.save(function (err) {
			if (err) return next(new BadRequestResponse(err));
			return next(new OkResponse({ message: "Password has been changed successfully" }));
		});
	} else return next(new BadRequestResponse("Invalid Old Password!!", 422));
});

router.put("/profile", auth.required, auth.user, (req, res, next) => {
	if (!req.body) return next(new BadRequestResponse("Missing required parameter.", 422.0));

	req.user.email = req.body.email || req.user.email;
	req.user.profileImage = req.body.profileImage || req.user.profileImage;

	req.user.save((err, data) => {
		if (err) return next(new BadRequestResponse(err));
		return next(new OkResponse(data));
	});
});

module.exports = router;
