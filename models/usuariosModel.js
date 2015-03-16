var mongoose = require('./models');

var usuariosModel = function () {

    var usuariosSchema = mongoose.Schema({
        id: String,
        identificador: String,
       	nombres: String,
        password:String,
       	relacion:String,
    }
    );
	var Usuarios = mongoose.model('usuarios', usuariosSchema);
    return Usuarios;
};

module.exports = new usuariosModel();