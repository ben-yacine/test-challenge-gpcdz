'use strict';

var EntityUser = require('./api.model.js').entityUser;
var config = require('../config/config').myConfig;

const request = require('request');

var token, timestamp;
const TOKEN_TIME_OUT = 600; // (10 second) Time for token to expire

var getToken = function(callback) {
    var options = {
        uri: 'http://localhost:5999/api/token',
        method: 'GET'
    };
    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            token = json.token;
	    timestamp = json.timestamp;
        }
	callback();
    });
}

var getUsers = function(callback) {
    var options = {
        uri: 'http://localhost:5999/api/users',
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var users = JSON.parse(body);
	    // Just for example, we will return the first user when saving EntityUser
            callback(users[0]);
        } else {
            callback({});
        }
    });
}

var checkRequiredAttrs = function(req, res, next) {

	var arr = config.createParams.required;
	var missingRequireParam = false;
	var error = '';

	for (var i = 0, len = arr.length; i < len; i++) {
		if (typeof req.body[arr[i]] === 'undefined') {

			missingRequireParam = true;
			error = 'Missing required params';
			break;
		}
	}

	if(missingRequireParam) {
		req.error = error;
	}
	
	return next();
}

var displayMainPage = function(req, res) {
	res.status(200).send({ message: 'API entity User for GpcDz challenge' });
}

var createEntityUser = function(req, res) {

  var entityUser = new EntityUser();

  if(typeof req.error === 'undefined') {
	  entityUser.socialMedia = req.body.socialMedia;
	  entityUser.dateCreation = new Date();
	  entityUser.dateUpdate = new Date();
	  entityUser.latitud = req.body.latitud,
	  entityUser.longitud = req.body.longitud,
	  entityUser.description = (typeof req.body.description == 'undefined') ? '' : req.body.description;
	  entityUser.type = (typeof req.body.type == 'undefined') ? '' : req.body.type;

	  var now = Math.floor(new Date().getTime() / 1000);

	  if(typeof token == 'undefined' || ((now-(timestamp/1000)) >= TOKEN_TIME_OUT) ) {
		getToken(function(){
			getUsers(function(user){
				entityUser.createdBy = user;
				entityUser.save(function(err) {
				    if (err)
				      return res.send(err);

				    res.json({ message: 'EntityUser created!', data: entityUser });
				  });
			});
		});
	  } else {
		// If token is still valid
		getUsers(function(user){
			entityUser.createdBy = user;
			entityUser.save(function(err) {
			    if (err)
			      return res.send(err);

			    res.json({ message: 'EntityUser created!', data: entityUser });
			  });
		});
	  }
  } else {
	res.status(400).send({ message: req.error });
  }
};

var updateEntityUser = function(req, res) {

  // Just for example, I update only two attributs and basicaly the dateUpdate
  EntityUser.update({ _id: req.params.id}, { dateUpdate: new Date(), latitud: req.body.latitud, description: req.body.description }, function(err, num, raw) {
    if (err)
      return res.send(err);

    res.json({ message: num + ' updated' });
  });

};

var deleteEntityUser = function(req, res) {

  EntityUser.remove({ _id: req.params.id }, function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'EntityUser removed' });
  });
};

var getEntityUser = function(req, res) {

  EntityUser.find({_id: req.params.id }, function(err, user) {
    if (err)
      return res.send(err);

    res.json(user);
  });
};

var getEntityUsers = function(req, res) {
  EntityUser.find(function(err, users) {
    if (err)
      return res.send(err);

    res.json(users);
  });
};

module.exports = {
	checkRequiredAttrs: checkRequiredAttrs,
	displayMainPage: displayMainPage,
	createEntityUser: createEntityUser,
	getEntityUsers: getEntityUsers,
	updateEntityUser: updateEntityUser,
	getEntityUser: getEntityUser,
	deleteEntityUser: deleteEntityUser
};
