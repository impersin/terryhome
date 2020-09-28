const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sendmail = require('sendmail')();
const isDeveloping = process.env.NODE_ENV !== 'production';
const sslRedirect = require('heroku-ssl-redirect').default;
const compression = require('compression');
const app = express();

app.use(compression());
app.use(sslRedirect(['development', 'production']));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/index.html'));
});

app.post('/sendemail',(req, res)=>{
  console.log(req.body);
  const from = req.body.email;
  const html = req.body.comments; 
  const userName = req.body.name;

  // sendmail({
  //   from,
  //   to: 'taegyuleem@gmail.com',
  //   subject: `Get in touch from ${userName}`,
  //   html,
  // }, function(err, reply) {
  //   if(err){
  //     console.log(err && err.stack);
  //   }else{
  //     console.dir(reply);
  //     res.json(reply);
  //   }
  // });
  //   res.sendStatus(200);
  setTimeout(()=>{
    res.json(200);
  },3000);
});

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
  console.log('listening port', port);
});