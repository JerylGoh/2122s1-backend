//Request
//queue manager will in turn call the relevant function in db manager, e.g .enqueue

//Response
//queue manager receives the result from db manager and prepares the body of the response and passes it back to queue route
//it essentially has access to the data returned from database to dbmanager, it just formats it in e.g json format and sends
//it back to queue route

const dbManager = require('./db_manager');

module.exports.enqueue = function () {
    return dbManager.enqueue().then((customerId) => ({ customer_id: customerId }));
};

module.exports.dequeue = function () {
    return dbManager.dequeue().then((customerId) => ({ customer_id: customerId }));
};
