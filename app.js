const express = require('express');
const fs = require('fs');
const app = express();
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


httpsport = "3001";

//Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/imsalvador.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/imsalvador.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/imsalvador.com/chain.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
  
})


// Starting both http & https servers

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(httpsport, function(){
  console.log('HTTPS Server running on port 3001');
});
