const assert = require("assert");
const client = require("mongodb").MongoClient;
// $FlowFixMe
const config = require("../../appConfig.json");

let _db;


module.exports = {
	getDb,
	initDb
}

function initDb(callback) {
	if (_db) {
		console.warn("!Trying to init db again");
		return callback(null, _db);
	}

	function connected(err, db) {
		if (err) {
			return callback(err);
		}
		console.log("Db initialized - connected to: " + config.db.connectionString);
		_db = db;
		return callback(null, _db);
	}

	client.connect(config.db.connectionString, config.db.connectionOptions, connected);
}

function getDb(databaseName) {
    assert.ok(_db, "Db has not been initialized. Please called init first.");
    if (databaseName == null) {
    	return _db;
    }
    return _db.db(databaseName);
}

