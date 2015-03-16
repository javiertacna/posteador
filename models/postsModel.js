var mongoose = require('./models'),
	Schema = mongoose.Schema;

var postsModel = function () {

    var postsSchema = Schema({
        content : 'string',
        id_usuario:'string',
    });
	var posts = mongoose.model('posts', postsSchema);
    return posts;
};

module.exports = new postsModel();