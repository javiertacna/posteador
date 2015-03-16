var mongoose = require('./models'),
	Schema = mongoose.Schema;

var re_postsModel = function () {

    var re_postsSchema = Schema({
        content : 'string',
        id_usuario:'string',
        id_post:'string'
    });
	var re_posts = mongoose.model('re_posts', re_postsSchema);
    return re_posts;
};

module.exports = new re_postsModel();