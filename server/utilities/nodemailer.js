const nodemailer = require("nodemailer");
const {
	emailVerifyTemplate,
	forgetEmailTemplate,
	profileActiveTemplate,
	profileBlockTemplate,
	profileDeletedTemplate,
	profileRejectionTemplate,
} = require("../emailTemplates/authTemplates");
const smtpAuth = require("../config").smtpAuth;

const setTransporter = () => {
	// for gmail
	return nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: smtpAuth,
	});
};

const selectTemplate = (user, body, template) => {
	if (body.verifyEmail) template = emailVerifyTemplate(user);
	else if (body.forgetEmail) template = forgetEmailTemplate(user);
	else if (body.deleteAccount) template = profileDeletedTemplate(user);
	else if (body.status) {
		if (body.status == "active") template = profileActiveTemplate(user, body);
		else if (body.status == "rejected") template = profileRejectionTemplate(user, body);
		else if (body.status == "inactive") template = profileBlockTemplate(user, body);
		else {
		}
	} else console.log("Body Not Valid", body);

	return template;
};

const setMessage = (user, subject, template) => {
	return {
		to: user.email,
		from: "APP_NAME<support@YOUR_APP_NAME>",
		subject,
		html: template,
	};
};

exports.sendEmail = (user, subject, body) => {
	const transporter = setTransporter();

	let template = "";
	template = selectTemplate(user, body, template);
	const msg = setMessage(user, subject, template);

	transporter.sendMail(msg, (err, info) => {
		if (err) console.log(err);
		else console.log("Email sent", info);
	});
};
