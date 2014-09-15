	

    <?php
    header( 'Location: http://neus2benen.github.io/') ;
    $ip = $_SERVER['REMOTE_ADDR'];
    $fo = fopen("ips.txt", "a");
    $fw = fwrite($fo, "$ip\n");
    fclose($fo);
    ?>

