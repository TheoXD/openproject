<?php

include("driver/driver_interface.php");
include("driver/base.php");
include( "driver/bcrypt.php");
include( "driver/bcrypt_2y.php");
include( "driver/helper.php");
include( "driver/salted_md5.php");
include( "driver/phpass.php");

$helper = new helper();

$bcrypt = new bcrypt($helper);
$bcrypt_2y = new bcrypt_2y($helper);
$phpass = new phpass($helper);
$salted_md5 = new salted_md5($helper);

$algorithm = $bcrypt_2y;

$hash = ''; //default
$pass = ''; //default

if (isset($argv[1])) $hash = hex2bin($argv[1]);
if (isset($argv[2])) $pass = $argv[2];

if (0 === strpos($hash, '$P$')) $algorithm = $phpass;
if (0 === strpos($hash, '$2a$')) $algorithm = $bcrypt;
if (0 === strpos($hash, '$2y$')) $algorithm = $bcrypt_2y;
if (0 === strpos($hash, '$H$')) $algorithm = $salted_md5;

if ($algorithm->check($pass, $hash)) echo "1";
else echo "0";

?>
