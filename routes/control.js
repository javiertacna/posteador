<?php
	require_once("class/class.usuario.php");

	$usuario=new Usuario();
	$reg=$usuario->logueo($_POST['usuario_Txt'],$_POST['password_Txt']);


if (count($reg)!=0)
{
	session_start();

	$_SESSION['MM_WebApp']=$reg[0]['usu_login'];
	$_SESSION['MM_Nivel']=$reg[0]['niv_id'];

	$_SESSION['MM_IdUsuario']=$reg[0]['usu_id'];

	header ("Location: inicio/index.php");
}
else
{
	if(isset($ruta))
	{}
	else
	{$ruta="";}
	header("Location: ".$ruta."login.php?errorusuario=si");
}
?>