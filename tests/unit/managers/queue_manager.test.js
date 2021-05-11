//unit testing is done on queue manager and stats manager, the files which will receive the response from db manager and format the response body(json e.g)
//before passing it to their respective routes to res.send response body to client.

//however, unit testing should be independent, so queue and stats manager should not depend on the db manager's real response, so we have to require the 
//db manager, and replace the actual sql query which queries database and returns a response from database to db manager which passes that response to 
//queue and stats manager WITH code that returns a testing value to queue and stats manager from the modified db manager used for testing

/*

so we replace

the actual db manager queries database with sql commands, gets a response, and sends that response back to queue or stats manager

dbManager.dequeue = function () {
    return pool
        .query(
            `UPDATE queue_tab 
            SET 
                served = true
            WHERE id = (SELECT id FROM queue_tab WHERE not served ORDER BY id LIMIT 1) 
            RETURNING *`,
        )
        .then((result) => (!result.rows.length ? 0 : result.rows[0].id));
};

with

make dbmanager return dummy response to queue or stats manager (by requiring the real db manager and replacing the actual code)

dbManager.dequeue = function () {
        return Promise.resolve(12);
    };

*/


const { it, run, makeRevertFunction } = require('../../test_driver');
const dbManager = require('../../../managers/db_manager');
const queueManager = require('../../../managers/queue_manager');

const revertDbManagerDequeue = makeRevertFunction(dbManager, 'dequeue');

//use `it` to add tests.
//'it' to add new test
it('should resolve dequeue correctly', function () {
    dbManager.dequeue = function () {
        return Promise.resolve(12);
    };
    // Important: Return the promise
    return queueManager
        .dequeue()
        .then(
            (result) =>
                JSON.stringify(result) ==
                JSON.stringify({
                    customer_id: 12,
                }),
        )
        .then(revertDbManagerDequeue);
});

it('Should reject dequeue correctly', function () {
    dbManager.dequeue = function () {
        return Promise.reject('ERROR!');
    };
    return queueManager
        .dequeue()
        .then(() => false)
        .catch((error) => error === 'ERROR!')
        .then(revertDbManagerDequeue);
});

// Run the tests
// Important: Keep this as the last line
//'run()' to actually run the test you created
run();
