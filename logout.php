<?php

session_start();
//DELETE / empty out user info
unset($_SESSION['userInfo']);

//destroy session - don't use with regenerate_id
//session_destroy();

//delete old session id from server memory
session_regenerate_id(true);

//direct user back to authorization page
header('Location: index.php');
exit;