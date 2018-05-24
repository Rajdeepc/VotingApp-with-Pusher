const express = require('express');
const path = require('path');
const app = express();
const Pusher = require('pusher');

app.use(express.static(path.join(__dirname)));


const pusher = new Pusher({
    appId: '531275',
    key: 'a91ca190f0d51002f8ad',
    secret: 'c5d6d038c7d78938a064',
    cluster: 'ap2',
    encrypted: true
  });

  //defining routes

  app.get('/', (req,res) => {
    res.sendFile('index.html', {root:__dirname});
  });

  app.get('/vote', (req, res) => {
      let item = req.query.item_id;
      pusher.trigger('counter', 'vote', {item:item});
      res.status(200).send();
  });

  //listen to the server

  const port = 5000;
  app.listen(port, () => {
      console.log(`Application is listening on ${port}`);
  });