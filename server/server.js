const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const isDeveloping = process.env.NODE_ENV !== 'production';
  
app.use(express.static(path.join(__dirname, '/../client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
  console.log('listening port', port);
});