const assert = require('assert');
const fs = require('fs');
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;


const user = encodeURIComponent('user');
const password = encodeURIComponent('Password');
const authMechanism = 'DEFAULT';
const dbName = 'exampleDb';

// Connection URL
const url = `mongodb://${user}:${password}@localhost:27017/?authMechanism=${authMechanism}&authSource=${dbName}`;

// Create a new MongoClient
const client = new MongoClient(url);




client.connect(function(error) {
  assert.ifError(error);

  const db = client.db(dbName);

  var bucket = new mongodb.GridFSBucket(db);

  fs.createReadStream('./Duck.gltf').
    pipe(bucket.openUploadStream('Duck.gltf')).
    on('error', function(error) {
      assert.ifError(error);
    }).
    on('finish', function() {
      console.log('done!');
      process.exit(0);
    });
});