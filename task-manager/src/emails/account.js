const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'can@gmail.com',
    subject: 'Thanks for joining in',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
  });
};

const sendCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'can@gmail.com',
    subject: 'Sad to see you go!',
    text: `We are sorry to see you leave our app, ${name}.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail,
};
