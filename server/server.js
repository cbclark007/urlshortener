const express = require('express')
const bodyParser = require('body-parser');
const _ = require('lodash');
const hbs = require('hbs');
const path = require('path');

const mongoose = require('./db/mongoose.js').mongoose;
const Url = require('./models/url.js').Url;

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.redirect('urls')
})

app.get('/urls', (req, res) => {
  Url.find()
  .then(urls => {
    console.log(urls);
    res.render("./urls/get.hbs", {
      urls:urls,
    })
    // res.send({
    //   urls
    // })
  }, e => {
    res.status(404).send(e)
  })
})

app.get('/urls/new', (req, res) => {
  res.render('./urls/new.hbs')
})


app.post('/urls', (req, res) => {
  console.log(req.body);
  const url = new Url({
    shortenedUrl:req.body.shortened,
    originalUrl:req.body.original
  });

  url.save().then(doc => {
    res.redirect('/');
  }, e => {
    res.status(404).send(e);
  })
})

app.get('/:short', (req, res) => {
  const short = req.params.short;

  Url.find({"shortenedUrl": short})
    .then(url => {
      res.redirect(url[0].originalUrl);
    }, err => {
      res.send(e);
    })
})

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
