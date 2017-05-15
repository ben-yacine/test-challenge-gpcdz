'use strict';

var express = require('express');
var router = express.Router();

var controller = require('./api.controller');

router.get('/', controller.displayMainPage);
router.get('/api/entityUsers', controller.getEntityUsers);
router.get('/api/entityUsers/:id', controller.getEntityUser);
router.post('/api/entityUsers', controller.createEntityUser);
router.put('/api/entityUsers/:id', controller.updateEntityUser);
router.delete('/api/entityUsers/:id', controller.deleteEntityUser);

module.exports = router;
