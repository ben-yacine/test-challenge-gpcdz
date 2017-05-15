'use strict';

var mongoose = require('../config/config').mongoose;

var Schema = mongoose.Schema;

var EntityUserSchema = new Schema({
  socialMedia: { type: String,required: true },
  dateCreation: { type: Date,required: true },
  dateUpdate: { type: Date,required: true },
  createdBy: { type: Object,required: true },
  latitud: { type: Number,required: true },
  longitud: { type: Number,required: true },
  description: { type: String},
  type: { type: String}
});

// we need to create a model using it
var entityUser = mongoose.model('EntityUser', EntityUserSchema);

module.exports = {
	entityUser: entityUser
};
