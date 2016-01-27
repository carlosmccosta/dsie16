<?php

define ('DB_NAME', 'up199603712');
define ('DB_USER', 'up199603712');
define ('DB_PASSWORD', 'B56Sae32i');
define ('DB_HOST', 'db.fe.up.pt');

$link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);

if (!$link) {
	die('Could not connect: ' . mysql_error());
}

$db_selected = mysql_select_db(DB_NAME, $link);

if (!db_selected) {
	die('Can\'t use ' . DB_NAME . ': ' . mysql_error());
}

$fName=$_POST['FirstName'];
$lName=$_POST['LastName'];
$eMail=$_POST['eMail'];
$TypeParticipant=$_POST['TypeParticipant'];
$TypeParticipant_Other=$_POST['TypeParticipant_Other'];
$TypeRegistration=$_POST['TypeRegistration'];
$TypeRegistration_Other=$_POST['TypeRegistration_Other'];
$Lunch=$_POST['Lunch'];
$Comments=$_POST['Comments'];

if ($Lunch == "on")
{
	$Lunch = "Yes";
}


$sql = "INSERT INTO Registration (FirstName,LastName,Email,TypeParticipant,TypeParticipant_Other,TypeRegistration,TypeRegistration_Other,Lunch,Comments) VALUE ('$fName','$lName','$eMail','$TypeParticipant','$TypeParticipant_Other','$TypeRegistration','$TypeRegistration_Other','$Lunch','$Comments')";
if (!mysql_query($sql)){
	die('Error: ' . mysql_error());
}

mysql_close();

header("Location: https://paginas.fe.up.pt/~prodei/dsie16/registration/form_ok.html");
//GOTO(https://paginas.fe.up.pt/~prodei/dsie16/registration/form_ok.html);

?>

