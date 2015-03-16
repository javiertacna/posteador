$(document).ready(function(){
	window.io = io.connect();

/*io.on('connect', function(socket){
		console.log('hi');
		io.emit('hello');
	});*/

	io.on('saludo',function(data){
		console.log('hola22');
	});


	io.on('xxx', function(data){
		//console.log('hola');
		$('#panel_posts').append('<p>hola</p>');

	});

	io.on('post_publico', function(data){
		crear_div_posts(data.usuario_po,data.usuario_id,data.clave_p,data.men_publico);
//$('#panel_posts').append('<p>hola</p>');
		$('#div_body_posts'+data.clave_p+"_"+data.usuario_id).prepend('<p>'+data.men_publico+'</p>');

	});

io.on('post_megusta', function(data){
		crear_megusta(data.men_publico,data.clave_p,0);
		//crear_div_posts(data.usuario_po,data.usuario_id,data.clave_p,data.men_publico);
		//$('#me_gusta').prepend('<p>'+data.men_publico+'</p>');
		//$('#me_gusta').prepend("<span style='background-color: red; padding:5px;'>1</span>");


	});


});
