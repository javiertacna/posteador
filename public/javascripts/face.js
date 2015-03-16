function objetoAjax()
{
	var xmlhttp=false;
	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
		   xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (E) {
			xmlhttp = false;
  		}
	}

	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
		xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}
/*
function cargar(pagina, division) {

		divContenido = document.getElementById(division);
		ajax=objetoAjax();
		ajax.open("POST", pagina);

		ajax.onreadystatechange=function() {
			if (ajax.readyState==4) {
				divContenido.innerHTML = ajax.responseText
			}
		}
		ajax.send(null)
	}

*/
function cargar_data(ruta,contenedor,contenido_mensaje,clave)
{
	// Ajax Call to check if the username / password are correct

	 //var usuario_id=document.getElementById('usuario_id').value;
	 var parametros = {
                "valor_nombre" : contenido_mensaje,
                "id_friend":clave
        };

	jQuery.ajax({
		type: "POST",
		//url: direccion+'index.php/login_controller/user_validation', antiguo
		url: ruta,
		data: parametros,
		success: function(resp)
		{
			jQuery('#'+contenedor).html(resp).show;
		},
	});
}  //end of checkUser() function


function cargar(ruta,contenedor,contenido_mensaje,clave,user_name,id_usuario)
{
	// Ajax Call to check if the username / password are correct
	 var valorCaja1=document.getElementById(contenido_mensaje).value;
	 //var usuario_id=document.getElementById('usuario_id').value;
	 var parametros = {
                "valorCaja1" : valorCaja1,
                "clave":clave,
                "nombre":user_name,
                "id_usuario":id_usuario
        };

	jQuery.ajax({
		type: "POST",
		//url: direccion+'index.php/login_controller/user_validation', antiguo
		url: ruta,
		data: parametros,
		success: function(resp)
		{
			jQuery('#'+contenedor).html(resp).show;
		},
	});
}  //end of checkUser() function

function cargar_publico(ruta,user_id,id)
{
	var posicion=id+"_"+user_id;
	var contenedor= 'div_body_posts'+posicion;
	var contenido_mensaje='txt_conversacion_posts'+posicion;
	var clave= posicion;


	 var valorCaja1=document.getElementById('postear_mensaje').value;
	//console.log(valorCaja1);
	 var parametros = {
                "valor_mensaje" : valorCaja1,
                "clave_mensaje":clave,
                "valor_i":id
        };

	jQuery.ajax({
		type: "POST",
		url: ruta,
		data: parametros,
		success: function(resp)
		{
			jQuery('#'+contenedor).html(resp).show;
		},
	});
}

function cargar_re_publico(ruta,identificador,mensaje)
{

	var parametros = {
                "valor_re_mensaje" : mensaje,
                "clave_re_mensaje":identificador
        };

	jQuery.ajax({
		type: "POST",
		url: ruta,
		data: parametros,
		success: function(resp)
		{
			jQuery('#megusta').html(resp).show;
		},
	});
}

function crear_megusta(valor,id_post,cont)
{
	var capa_posts = document.getElementById("me_gusta_contador");
	capa_posts.setAttribute('style', 'background-color: red; padding:5px;');
	cont =cont+1;
	capa_posts.innerHTML = cont;
}

function crear_div_posts(nombre_user,user_id,id,datos)
{
	var i =parseInt(id);

	var capa_posts = document.getElementById("panel_posts");
	var div_contenedor_posts = document.createElement("div");
	div_contenedor_posts.className ="div_contenedor_chat_publico";
	div_contenedor_posts.id="contenedor_posts"+i+"_"+user_id;
	capa_posts.appendChild(div_contenedor_posts);

	var div_titulo_posts = document.createElement("div");
	div_titulo_posts.id="titulo_posts"+i+"_"+user_id;
	div_titulo_posts.className ="div_titulo";
	div_titulo_posts.innerHTML = '<img class="logo" src="../images/uno.jpg" style="padding-right:8px;">'+nombre_user;
	div_contenedor_posts.appendChild(div_titulo_posts);

	var div_body_posts = document.createElement("div");
	div_body_posts.id="div_body_posts"+i+"_"+user_id;
	div_body_posts.setAttribute('style', 'height:90px;background-color:white;');
	div_contenedor_posts.appendChild(div_body_posts);

	var div_pie_posts = document.createElement("div");
	div_pie_posts.id="pie_posts"+i+"_"+user_id;
	div_pie_posts.className ="div_pie";
	div_pie_posts.setAttribute('style', 'margin-top:5px;margin-bottom:5px;');
	div_contenedor_posts.appendChild(div_pie_posts);


	var enviar_boton_posts = document.createElement("span");
	enviar_boton_posts.id="boton_enviar_posts"+i+"_"+user_id;
	enviar_boton_posts.innerHTML = 'me gusta';
	enviar_boton_posts.setAttribute('style', 'color:blue;cursor:pointer; cursor: hand;padding-left:5px;');
	enviar_boton_posts.setAttribute("onclick", "cargar_re_publico('/nuevo_mensaje_re_publico', '"+i+"', '"+datos+"');");
	div_pie_posts.appendChild(enviar_boton_posts);


	document.getElementById('i').value=	parseInt(document.getElementById('i').value)+1;
}

function crear_div(contenido,identificador,identificador2,user_name)
{
	if(identificador<identificador2)
	{
		var union= identificador+identificador2;
	}
	else
	{
		var union= identificador2+identificador;
	}

	var capa = document.getElementById("panel_footer");
	var div_contenedor = document.createElement("div");
	div_contenedor.className ="div_contenedor_chat";
	div_contenedor.id="contenedor"+union;
	capa.appendChild(div_contenedor);

	var div_titulo = document.createElement("div");
	div_titulo.id="titulo"+union;
	div_titulo.className ="div_titulo";
	div_titulo.innerHTML = contenido;
	div_contenedor.appendChild(div_titulo);

	/*var span_titulo_contenido = document.createElement("span");
	span_titulo_contenido.id="titulo_contenido"+union;
	span_titulo_contenido.className ="span_titulo";
	span_titulo_contenido.innerHTML = contenido;
	span_titulo.appendChild(span_titulo_contenido);*/

	var span_close = document.createElement("span");
	span_close.id="close"+union;
	span_close.className ="close";
	span_close.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	div_titulo.appendChild(span_close);


	var div_body = document.createElement("div");
	div_body.id="div_body"+union;
	div_contenedor.appendChild(div_body);

	var div_pie = document.createElement("div");
	div_pie.id="pie"+union;
	div_pie.className ="div_pie";
	div_contenedor.appendChild(div_pie);

	//var txt_conversacion = document.createElement("textarea");
	var txt_conversacion = document.createElement("input");
	txt_conversacion.id="txt_conversacion"+union;
	txt_conversacion.name="txt_conversacion"+union;
	txt_conversacion.setAttribute('style', 'display:none;');
//	txt_conversacion.setAttribute("onkeyup", "validateEnter(event);");

	div_pie.appendChild(txt_conversacion);

	var enviar_boton = document.createElement("input");
	enviar_boton.type='button';
	enviar_boton.id="boton_enviar"+union;
	//enviar_boton.setAttribute("onclick", "validateEnter();");
	enviar_boton.setAttribute("onclick", "cargar('/nuevo_mensaje', '"+div_body.id+"', '"+txt_conversacion.id+"','"+union+"','"+user_name+"','"+identificador2+"');");
	enviar_boton.setAttribute('style', 'display:none;');
	div_pie.appendChild(enviar_boton);

	div_titulo.setAttribute("onclick", "mensaje_txt('"+div_contenedor.id+"','"+div_titulo.id+"','"+span_close.id+"','"+div_body.id+"','"+div_pie.id+"','"+txt_conversacion.id+"','"+enviar_boton.id+"');");
	span_close.setAttribute("onclick", "minimiza_all('"+div_contenedor.id+"','"+div_titulo.id+"','"+span_close.id+"','"+div_body.id+"','"+div_pie.id+"','"+txt_conversacion.id+"','"+enviar_boton.id+"');event.cancelBubble=true;");

}


