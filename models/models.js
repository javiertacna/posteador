var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/red_social');

module.exports = mongoose;