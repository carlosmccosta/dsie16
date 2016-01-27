<!DOCTYPE html>
<html lang = "en-US">
 <head>
 <meta charset = "UTF-8">
 <title>Registrations List</title>
 <style type = "text/css">
  table, th, td {border: 1px solid black};
 </style>
 </head>
 <body>
 <p>
 <?php
  try {
  $con= new PDO('mysql:host=db.fe.up.pt;dbname=up199603712', "up199603712", "B56Sae32i");
  $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $query = "SELECT * FROM Registration";
 
  //first pass just gets the column names
  print "DISE 2016 Registrations<br>";
  print "<table> \n";
  $result = $con->query($query);
  //return only the first row (we only need field names)
  $row = $result->fetch(PDO::FETCH_ASSOC);
  print " <tr> \n";
  foreach ($row as $field => $value){
   print " <th>$field</th> \n";
  } // end foreach
  print " </tr> \n";
  //second query gets the data
  $data = $con->query($query);
  $data->setFetchMode(PDO::FETCH_ASSOC);
  foreach($data as $row){
   print " <tr> \n";
   foreach ($row as $name=>$value){
   print " <td>$value</td> \n";
   } // end field loop
   print " </tr> \n";
  } // end record loop
  print "</table> \n";
  } catch(PDOException $e) {
   echo 'ERROR: ' . $e->getMessage();
  } // end try
 ?>
 </p>
 </body>
</html>