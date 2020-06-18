const express = require('express');
const app = express();
const fs = require('fs');
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname, {
  dotfiles: 'allow'
}));


httpsPort = "3001";
httpPort = "3000";

//Run with SSL if windows not detected
if (process.platform !== "win32") {
  //Certificates to run with SSL
  const privateKey = fs.readFileSync('/etc/letsencrypt/live/imsalvador.com/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/imsalvador.com/cert.pem', 'utf8');
  const ca = fs.readFileSync('/etc/letsencrypt/live/imsalvador.com/chain.pem', 'utf8');

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
  };
  //Create HTTPS server
  const httpsServer = https.createServer(credentials, app);

  httpsServer.listen(httpsPort, function() {
    console.log('HTTPS Server running on port 3001' + httpsPort + ' SSL mode enabled!');
  });
}


//Run unsecure for development
if (process.platform == "win32") {
  // Start in http mode
  const httpServer = http.createServer(app);
  httpServer.listen(httpPort, function() {
    console.log('HTTP Server running on port ' + httpPort + ' for development NO SSL!');
  });
}


//Direct users
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
