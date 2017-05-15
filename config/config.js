'use strict';

var mongoose    = require('mongoose');
var access_mongo = require('./mongo/db_mongo_access.json');

var mongo_uri = "mongodb://"+access_mongo.DB_USER+":"+access_mongo.DB_PASSWORD+"@"+access_mongo.DB_HOST+"/"+access_mongo.DB_NAME;

mongoose.connect(mongo_uri, function(err) {
    if (err) throw err;
});

var myConfig = {
	"createParams": {
		"required": [
			"socialMedia",
			"latitud",
			"longitud"
		],
	},
	"updateParams": {
		"required": [
			"latitud",
			"description"
		],
	},
};

module.exports = {
	mongoose: mongoose,
	myConfig: myConfig
};
