
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
const dboper = require('./operations');

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
        console.log('Dropped Collection:', result);

        dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test"},
            'campsites', result => {
            console.log('Insert Document:', result.ops);

            dboper.findDocuments(db, 'campsites', docs => {
                console.log('Found Documents:', docs);

                dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
                    { description: "Updated Test Description" }, 'campsites',
                    result => {
                        console.log('Updated Document Count:', result.result.nModified);

                        dboper.findDocuments(db, 'campsites', docs => {
                            console.log('Found Documents:', docs);
                            
                            dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                                'campsites', result => {
                                    console.log('Deleted Document Count:', result.deletedCount);

                                    client.close();
                                }
                            );
                        });
                    }
                );
            });
        });
    });
});