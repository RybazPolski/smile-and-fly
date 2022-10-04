<!--Używane do generowania instrukcji if dla celu podróży-->

<?php

    $conn = new mysqli("localhost","root","","biura_cele");
    // $res = $conn->query('SELECT `rainbow`,`API` FROM `baza` WHERE `rainbow`!="N"');
    // while($rec = $res->fetch_object()){
    //     echo "if(el=='$rec->API'){<br>destinations.push('$rec->rainbow')<br>}else ";
    // }

    // $res = $conn->query('SELECT `tui`,`API` FROM `baza` WHERE `tui`!="N"');
    // while($rec = $res->fetch_object()){
    //     echo "if(el=='$rec->API'){<br>destinations.push('$rec->tui')<br>}else ";
    // }

    $res = $conn->query('SELECT `itaka`,`API` FROM `baza` WHERE `itaka`!="N"');
    while($rec = $res->fetch_object()){
        echo "if(el=='$rec->API'){<br>destinations.push('$rec->itaka')<br>}else ";
    }

    $conn->close();
?>