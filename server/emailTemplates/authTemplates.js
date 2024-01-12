const { footer, header } = require("./layout");

exports.emailVerifyTemplate = (user) => {
	return `
    <!DOCTYPE html>
    <html lang="en">
    ${header}
    <body>
       <div
        style="font-family: Arial, Helvetica, sans-serif; background-color: #F0F3F7;width: 638px;padding: 24px; margin: 0 auto;">
            <div style="width: 150px; height: 60px; margin: 0 auto;">
                <img src="${publicPics}/logo.png" alt="" style="width:100%; height:100%; object-fit:contain;">
            </div>
            <div style="background-color: #F8F9FB;border-radius: 24px; padding: 30px 55px;">
                <h1
                    style="font-style: normal;font-weight: 400;font-size: 24px;color: #313D5B;text-align: center; letter-spacing: 0.02em;">
                    Welcome to Fixer Station!
                </h1>
                <div
                    style="background-color: white; box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;border-radius: 32px;width: 208px;height: 208px; margin:auto; padding:10px ">
                    <img src="${publicPics}/Icons-bid.png" style="margin:63px;" alt="">
                </div>
                <p style="text-align:center; font-weight: 400;font-size: 16px; color: #313D5B;">To verify your email
                    address, click the button below:</p>
                <div style="text-align:center ; margin-top: 50px;">
                    <a href="${user?.link}"
                        style="    background-color: #2da44e;border-radius: 16px;text-decoration: none;padding: 14px 30px;color: #fff;  ">
                        Confirm registration
                    </a>
                </div>
                <p
                    style="margin-bottom: 0; margin-top: 40px; text-align: center; font-style: normal;font-weight: 400;font-size: 16px; color: #313D5B;">
                    If the button does not work, follow the link below:
                </p>
                <div style="text-align: center; margin-top: 5px;">
                    <a 
                        style="text-decoration: none;font-style: normal;font-weight: 400; color: #2da44e; font-size: 16px;">https://www.fixer-station.com/confirmation-${user?.mailToken}</a>
                </div>
            </div>
            ${footer}
        </div>
    </body>

    </html>`;
};

exports.forgetEmailTemplate = (user) => {
	return `
    <!DOCTYPE html>
    <html lang="en">
    ${head}
    <body>
       <div
            style="font-family: Arial, Helvetica, sans-serif; background-color: #F0F3F7;width: 638px;height: 766px;padding: 24px; margin: 0 auto;">
            <div style="width: 150px; height: 60px; margin: 0 auto;">
                <img src="${publicPics}/logo.png" alt="" style="width:100%; height:100%; object-fit:contain;">
            </div>
            <div style="background-color: #F8F9FB;border-radius: 24px; padding: 30px 55px;">
                <h1
                    style="font-style: normal;font-weight: 400;font-size: 24px;color: #313D5B;text-align: center; letter-spacing: 0.02em;">
                    Password reset</h1>
                <div
                    style="background-color: white; box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;border-radius: 32px;width: 208px;height: 208px; margin: 0 auto; padding:13px;">
                    <img src="${publicPics}/passwordReset.png" alt="" style="margin:40px 30px">
                </div>
                <p
                    style="text-align:center; font-weight: 400;font-size: 16px; color: #313D5B; width:80%; margin: 30px auto;">
                    You recently requested to reset your password for your Business account.
                </p>
                <div style="text-align:center ; margin-top: 30px;">
                    <a href="${user?.link}"
                        style="background-color:#2da44e; border-radius: 16px;text-decoration: none;padding: 14px 30px;color: #fff;  ">
                        Reset your password
                    </a>
                </div>
                <p
                    style="margin-bottom: 0; margin-top: 40px; text-align: center; font-style: normal;font-weight: 400;font-size: 16px; color: #313D5B;">
                    If you did not request to reset your password, please ignore this mail. This password reset request is
                    only valid for the next 30 minutes.
                </p>
            </div>
            ${footer}
        </div>
    </body>
    </html>
    `;
};

exports.profileRejectionTemplate = (user) => {
	return `
    <!DOCTYPE html>
    <html lang="en">
    ${head}
    <body>
    <div
    style="font-family: Arial, Helvetica, sans-serif; background-color: #F0F3F7;width: 638px;padding: 24px; margin: 0 auto;">
        <div style="width: 150px; height: 60px; margin: 0 auto;">
            <img src="${publicPics}/logo.png" alt="" style="width:100%; height:100%; object-fit:contain;">
        </div>
        <div style="background-color: #F8F9FB;border-radius: 24px; padding: 30px 55px;">
            <h1
                style="font-style: normal;font-weight: 400;font-size: 24px;color: #313D5B;text-align: center; letter-spacing: 0.02em;">
                Account Alert!
            </h1>
            <div
                style="background-color: white; box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;border-radius: 32px;width: 208px;height: 208px; margin:auto; padding:36px; box-sizing: border-box;">
                <img src="${publicPics}/blockIcon.png" alt="">
            </div>
            <p style="text-align:center; font-weight: 400;font-size: 16px; color: #313D5B;">Your Account approval is rejected by admin.</p>

            <div style="text-align: center; margin-top: 20px;">
                <a href="javascript:void(0)"
                    style="text-decoration: none; font-size: 13px;font-weight: 400;letter-spacing: 0.02em;color: #2da44e;">View
                    in browser</a>
            </div>
        </div>
        ${footer}
    </div>
    </body>

    </html>`;
};

exports.profileActiveTemplate = (user) => {
	return `
    <!DOCTYPE html>
    <html lang="en">
    ${head}
    <body>
       <div
        style="font-family: Arial, Helvetica, sans-serif; background-color: #F0F3F7;width: 638px;padding: 24px; margin: 0 auto;">
            <div style="width: 150px; height: 60px; margin: 0 auto;">
                <img src="${publicPics}/logo.png" alt="" style="width:100%; height:100%; object-fit:contain;">
            </div>
            <div style="background-color: #F8F9FB;border-radius: 24px; padding: 30px 55px;">
                <h1
                    style="font-style: normal;font-weight: 400;font-size: 24px;color: #313D5B;text-align: center; letter-spacing: 0.02em;">
                   Account Alert!
                </h1>
                <div
                    style="background-color: white; box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;border-radius: 32px;width: 208px;height: 208px; margin:auto; padding:10px ">
                    <img src="${publicPics}/Icons-bid.png" style="margin:63px;" alt="">
                </div>
                <p style="text-align:center; font-weight: 400;font-size: 16px; color: #313D5B;">Your Account is activated by admin</p>
               
                <div style="text-align: center; margin-top: 20px;">
                <a href="javascript:void(0)"
                    style="text-decoration: none; font-size: 13px;font-weight: 400;letter-spacing: 0.02em;color: #2da44e;">View
                    in browser</a>
            </div>
            </div>
            ${footer}
        </div>
    </body>

    </html>`;
};

exports.profileBlockTemplate = (user) => {
	return `
    <!DOCTYPE html>
    <html lang="en">
    ${head}
    <body>
       <div
        style="font-family: Arial, Helvetica, sans-serif; background-color: #F0F3F7;width: 638px;padding: 24px; margin: 0 auto;">
            <div style="width: 150px; height: 60px; margin: 0 auto;">
                <img src="${publicPics}/logo.png" alt="" style="width:100%; height:100%; object-fit:contain;">
            </div>
            <div style="background-color: #F8F9FB;border-radius: 24px; padding: 30px 55px;">
                <h1
                    style="font-style: normal;font-weight: 400;font-size: 24px;color: #313D5B;text-align: center; letter-spacing: 0.02em;">
                    Account Alert!
                </h1>
                <div
                    style="background-color: white; box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;border-radius: 32px;width: 208px;height: 208px; margin:auto; padding:36px; box-sizing: border-box;">
                    <img src="${publicPics}/blockIcon.png" alt="">
                </div>
                <p style="text-align:center; font-weight: 400;font-size: 16px; color: #313D5B;">
                    Your Account is blocked by admin.
                </p>
                <div style="text-align: center; margin-top: 20px;">
                <a href="javascript:void(0)"
                    style="text-decoration: none; font-size: 13px;font-weight: 400;letter-spacing: 0.02em;color: #2da44e;">View
                    in browser</a>
            </div>
            </div>
            ${footer}
        </div>
    </body>

    </html>`;
};

exports.profileDeletedTemplate = (user) => {
	return `
    <!DOCTYPE html>
    <html lang="en">
    ${head}
    <body>
        <div
            style="font-family: Arial, Helvetica, sans-serif; background-color: #F0F3F7;width: 638px;padding: 24px; margin: 0 auto;">
            <div style="width: 150px; height: 60px; margin: 0 auto;">
                <img src="${publicPics}/logo.png" alt="" style="width:100%; height:100%; object-fit:contain;">
            </div>
            <div style="background-color: #F8F9FB;border-radius: 24px; padding: 30px 55px;">
                <h1
                    style="font-style: normal;font-weight: 400;font-size: 24px;color: #313D5B;text-align: center; letter-spacing: 0.02em;">
                    Account Alert!
                </h1>
                <div
                    style="background-color: white; box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;border-radius: 32px;width: 208px;height: 208px; margin:auto; padding:36px; box-sizing: border-box; ">
                    <img src="${publicPics}/blockIcon.png" alt="">
                </div>
                <p style="text-align:center; font-weight: 400;font-size: 16px; color: #313D5B;">Your Account is deleted by admin</p>
                <div style="text-align: center; margin-top: 20px;">
                <a href="javascript:void(0)"
                    style="text-decoration: none; font-size: 13px;font-weight: 400;letter-spacing: 0.02em;color: #2da44e;">View
                    in browser</a>
            </div>
            </div>
            ${footer}
        </div>
    </body>

    </html>`;
};
