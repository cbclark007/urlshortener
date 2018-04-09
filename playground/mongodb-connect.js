const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const url = 'mongodb://localhost:27017';
const dbName = 'UrlShortener';

MongoClient.connect(url, (err, client) => {
  if(err) {
    return console.log("Unable to connect to Mongodb");
  }
  const db = client.db(dbName);

  //insertOne
  //insertMany

  db.collection('Urls').insertMany([
    {
      shortenedUrl:"google",
      originalUrl:"https://www.google.com"
    }
  ])
  .then(response => {
    console.log(JSON.stringify(response.ops, undefined, 2));
  })
  .catch(err => {
    console.log("unable to write to mongodb: ", err);
  })

  // find()
  // limit()
  //
  // db.collection('Urls').find({completed: false}).limit(4).toArray()
  //   .then(response => {
  //     console.log(JSON.stringify(response, undefined,  2));
  //   })
  //   .catch(err => {
  //     console.log("Unable to fetch results from MongoDB");
  //   })
  //
  // //update
  // db.collection('Urls').updateOne(
  //   {
  //     text:'eat lunch'
  //   },
  //   {
  //     $set: {completed:false}
  //   },
  //   {
  //     returnOriginal:false
  //   }
  // )
  // .then(response => {
  //   console.log(JSON.stringify(response, undefined, 2));
  // })
  // .catch(err => {
  //   console.log("unable to update");
  // })
  //
  // db.collection('Urls').findOneAndDelete({_id: ObjectId("asdf")})
  // .then(response => {
  //   console.log(JSON.stringify(response, undefined, 2));
  // }, err => {
  //   console.log("unable to delete document");
  // })

  client.close();
})
