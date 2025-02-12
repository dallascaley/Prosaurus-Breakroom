/* This was the original thing and it worked fine, just no HTTPS

module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8080
  }
}
*/

module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync('/home/dallas/prosaurus/key.pem'),
      cert: fs.readFileSync('/home/dallas/prosaurus/cert.pem'),
    },
    port: 5173, // You can change this port if needed
  },
};