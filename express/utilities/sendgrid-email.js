const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = (to, from, subject, htmlContent) => {
  const msg = {
    to: to,
    from: from,
    subject: subject,
    html: htmlContent,
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