const sendGrid = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = process.env;
sendGrid.setApiKey(SENDGRID_API_KEY);

console.log('this is my key: ', SENDGRID_API_KEY);

const sendEmail = ({ to, from, subject, text, html }) => {
  const msg = { to, from, subject, text, html };
  return sendGrid.send(msg);
};

module.exports = { sendEmail };
