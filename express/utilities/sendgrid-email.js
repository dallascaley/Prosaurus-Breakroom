const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = (to, from, subject, text) => {
  const msg = {
    to: to,
    from: from,
    subject: subject,
    text: text,
  };

  sgMail.send(msg).then(() => {
  	return {
  	  status: 200, 
  	  message: 'Email sent successfully!'
  	};
  }).catch((error) => {
    return {
      status: 500, 
      message: 'Error sending email: ' + error.message
    };
  });
}

module.exports = {
  sendMail
};