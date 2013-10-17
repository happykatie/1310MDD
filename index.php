<?php
//CONTROLLER

require_once "assets/db.php";
require_once "controller/mainController.php"; 
require_once "views/SparkView.php"; 

//instantiate model and view
$model = new mainController(MY_DSN, MY_USER, MY_PASS);
$view = new SparkView();

//trim and lowercase form data
$username = empty($_POST['username']) ? '' : strtolower(trim($_POST['username']));
$password = empty($_POST['password']) ? '' : trim($_POST['password']);

$contentPage = 'loginform';
$user = NULL;
session_start();

//If a session is started, pass in user info
if(!empty($_SESSION['userInfo'])) {
	
	$contentPage = 'profile';
	
	//user to display = userInfo content, not login page
	$user = $_SESSION['userInfo'];
}

//Validate un and pw 
if (!empty($username) && !empty($password)) {
	//model says $user will be array if valid, or false if invalid
	$user = $model->getUserByNamePass($username, $password);
	
	if (is_array($user)) {
		//Go to profile view
		$contentPage = 'profile';
		//Pass user info into session, as $user
		$_SESSION['userInfo'] = $user;
	}
}

$view->showHeader();
$view->show($contentPage, $user);
$view->showFooter();