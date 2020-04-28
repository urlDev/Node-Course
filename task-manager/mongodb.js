// CRUD create read update delete

const { MongoClient, ObjectID } = require('mongodb');

// we could write localhost here
// but apparently it causes some weird bugs and slows down the app
const connectionURL = 'mongodb://127.0.0.1:27017';
// database name
const databaseName = 'task-manager';

// this creates new id
// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());

// to connect database, first url then parsing
MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      console.log('unable to connect to database');
    }

    //to manipulate the database, we use client.db(name)
    const db = client.db(databaseName);

    // db.collection('users')
    //   .deleteMany({
    //     age: 32,
    //   })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // db.collection('tasks')
    //   .deleteOne({
    //     description: 'Finish NodeJs course',
    //   })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((err) => console.log(err));
  }
);
