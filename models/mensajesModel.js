var mongoose = require('./models'),
	Schema = mongoose.Schema;

var mensajesModel = function () {

    var mensajesSchema = Schema({
        content : 'string',
        pares:'string',
        usuario_e:'string',
    });
	var Mensajes = mongoose.model('mensajes', mensajesSchema);
    return Mensajes;
};

module.exports = new mensajesModel();

/*
user : {
			type : Schema.Types.ObjectId,
			ref : 'usuarios'
		}*/