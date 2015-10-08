<?php
$im = imagecreatefrompng("http://i.imgur.com/h1b8Wxu.png");

header('Content-Type: image/png');

imagepng($im);
imagedestroy($im);
?>