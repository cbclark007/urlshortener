const mongoose = require('mongoose');

const UrlSchema = mongoose.Schema({
  shortenedUrl: {
    type:String,
    required:true,
    minLength:1,
  },
  originalUrl: {
    type:String,
    required:true,
    minLength:1
  }
})

const Url = mongoose.model('Url', UrlSchema);

module.exports = {Url};
