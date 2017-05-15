'use strict';

var EntityUser = require('./api.model.js').entityUser;

var displayMainPage = function(req, res, next) {
	res.status(200).send({ message: 'API entity User for GpcDz challenge' });
}

var createEntityUser = function(req, res) {

  var entityUser = new EntityUser();

  entityUser.socialMedia = req.body.socialMedia;
  entityUser.dateCreation = new Date();
  entityUser.dateUpdate = new Date();
  entityUser.createdBy = {};
  entityUser.latitud = 0,
  entityUser.longitud = 0,
  entityUser.description = req.body.description;
  entityUser.type = req.body.type;

  entityUser.save(function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'EntityUser created!', data: entityUser });
  });
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
	displayMainPage: displayMainPage,
	createEntityUser: createEntityUser,
	getEntityUsers: getEntityUsers,
	updateEntityUser: updateEntityUser,
	getEntityUser: getEntityUser,
	deleteEntityUser: deleteEntityUser
};
