var UsuariosModel = require('../models/usuariosModel');
var MensajesModel = require('../models/mensajesModel');
var PostsModel = require('../models/postsModel');
var Re_postsModel = require('../models/re_postsModel');
var url = require('url');
var _ = require('underscore');
module.exports = function(app)
{
app.io.route('hello', function(req){
	req.io.emit('saludo',{
				contenido : "hola"

	} );

});

var isntLoggedIn = function(req, res, next){
	if(!req.session.nombres)
	{
		res.redirect('/login');
		return;
	}
	next();
};

	app.get('/',isntLoggedIn, function(req,res){
		var usuario_id = req.session.identificador;

		UsuariosModel.find({relacion: usuario_id},function(err, respuesta) {
		console.log(respuesta);
			res.render('index', {
				user:req.session.nombres,
				user_id:req.session.identificador,
				users:respuesta
			});
		});
	})


	app.get('/login', function(req,res){
		res.render('login');
	})
	app.get('/registrando', function(req,res){
		res.render('registro');
	})

	app.post('/registrar', function(req,res){
		var registro = new UsuariosModel({
			nombres : req.body.usuario_Txt,
			password : req.body.password_Txt
		} );

		var ss= registro.save(function(err){
			if(err){
				res.send(500, err);
			}
			/*app.io.broadcast('post',{
				content : req.body.content,
				user : req.user.toJSON()
			});*/
			//req.session.identificador = ;

			//console.log('dos');
			//res.redirect('/app');
			//console.log(ss.emitted.complete[0]._id);

			req.session.identificador = ss.emitted.complete[0]._id;
			req.session.nombres = req.body.usuario_Txt;
			res.redirect('/');
			return;

		});


	} )


	app.post('/nuevo_mensaje_re_publico',  function (req, res) {
		app.io.broadcast('post_megusta',{men_publico:req.param('valor_re_mensaje'), clave_p:req.param('clave_re_mensaje')});
	} );

	app.post('/nuevo_mensaje_publico',  function (req, res) {
		var post_publico = new PostsModel({
			content : req.param('valor_mensaje'),
			id_usuario:req.session.identificador

		} );

		var ss = post_publico.save(function(err){
			if(err){
				res.send(500, err);
			}

		app.io.broadcast('post_publico',{men_publico:req.body.valor_mensaje, clave_p:req.param('valor_i'),usuario_po:req.session.nombres,usuario_id:req.session.identificador,id_post:post_publico._id});

			/*PostsModel.find({id_usuario:req.session.identificador}, function(err, respuesta) {
				res.render('menn', {
					posts : respuesta
				});
			});*/

		});
	} );

	app.post('/nuevo_mensaje',  function (req, res) {
		var post = new MensajesModel({
			content : req.param('valorCaja1'),
			pares:req.param('clave'),
			usuario_e:req.param('id_usuario')
		} );
		console.log(post);
		post.save(function(err){
			if(err){
				res.send(500, err);
			}

			app.io.broadcast('posta',{conver:req.body.valorCaja1, clave:req.param('clave'), nombre:req.param('nombre')});
			//res.redirect('/app');
			//console.log(req.param('usuario_id'));console.log(req.param('usuario_id_dos'));

			MensajesModel.find({pares:req.param('clave')}, function(err, respuesta) {
				res.render('menn', {
					posts : respuesta
				});

			});
		});
	} );



	app.get('/app', function (req, res) {
		MensajesModel.find( function(err, respuesta) {

			res.render('menn', {
					posts : respuesta
			});


		});

	});

	app.post('/control', function(req,res){

		UsuariosModel.find({nombres: req.body.usuario_Txt, password:req.body.password_Txt}, function(err, respuesta) {
			if(respuesta.length)
			{
				req.session.identificador = respuesta[0]._id;
				req.session.nombres = respuesta[0].nombres;
			 	res.redirect('/');
			 	return;
			}
			else
			{
				//console.log(req.body.usuario_Txt);
				//console.log(req.body.password_Txt);
				res.end('saliio');
			}

		});

	} )



}


