<?php
for($i=0;$i<3;$i++){
    for($j=0;$j<=$i;$j++){
        echo"*";
    }
    echo"<br>";
}
for($i=3;$i>0;$i--){
    for($j=0;$j<$i;$j++){
        echo $j+1;
    }
    echo"<br>";
}
$A=['A','B','C','D','E','F'];
$k=0;
for($i=0;$i<3;$i++){
    for($j=0;$j<=$i;$j++){
        
        echo $A[$k];
        $k++;
    }
    echo "<br>";
}








?>