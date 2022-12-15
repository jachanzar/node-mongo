
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

//uses mongoclient connect method; 3 parameters, url, object, and callback
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    /* callback uses assert.strictEqual to check for errors. Shorthand
    for:
    if (err === null) { end }, otherwise continue.
    */
    assert.strictEqual(err, null); 

    console.log('Connected correctly to server');

    /*this method connects us to nucampsite database on the mongodb
    server and we can use db object to access set of methods to interact
    with that database
     */
    const db = client.db(dbname);
    
    /*Only for NUCAMP PURPOSES, this just creates clean database everytime
    we test*/

    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);

        /*recreating the campsites collection after deleting it. 
        allow us to access it again.
        */
        const collection = db.collection('campsites');

        /*inserting document into collection.
        takes object with name and description properties, 
        and checks for errors*/
        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"},
        (err, result) => {
            assert.strictEqual(err, null);
            console.log('Insert Document:', result.ops);

            /*use collection.find and toArray to console log
            all documents from campsites collection.*/ 
            collection.find().toArray((err, docs) => {
                assert.strictEqual(err, null);
                console.log('Found Documents:', docs);

                client.close();
            });
        });
    });
});