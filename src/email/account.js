require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SG_API_KEY);

// const msg = {
//   to: "test@example.com", // Change to your recipient
//   from: "test@example.com", // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch((error) => {
//     console.error(error);
//   });

const sendWelcomeEmail = (email, name) => {
  const options = {
    from: "william.binitie@babbangona.com", // sender address
    to: email, // list of receivers
    subject: "Thank you for joining in!", // Subject line
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`, // plain text body
    //   html: "<b>Hello world?</b>", // html body
  };

  sgMail
    .send(options)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
const sendCancellationEmail = (email, name) => {
  const options = {
    from: "william.binitie@babbangona.com", // sender address
    to: email, // list of receivers
    subject: "Your account has been canceled. We are sad to see you leave.", // Subject line
    text: `Hi ${name},\nThis email confirms that your account has been canceled.\nWe're really sorry to see you leave, but thanks for giving us a try.`, // plain text body
    //   html: "<b>Hello world?</b>", // html body
  };

  sgMail
    .send(options)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

const forgotPasswordEmail = (email, token) => {
  const options = {
    from: "william.binitie@babbangona.com",
    to: email,
    subject: "Password Reset Link",
    html: `
            <a><h2>Please click on the given link to reset your password</h2>
            <p>${process.env.CLIENT_URL}/resetpassword/${token}</p></a>
      `,
  };

  sgMail
    .send(options)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
