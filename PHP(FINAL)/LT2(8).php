<?php
$A=[
    [1,2,3,"A"],
    [1,2,"B","C"],
    [1,"D","E","F"]];
$k=2;
for($i=2;$i>=0;$i--){
    for($j=0;$j<=$i;$j++){
        echo $A[$i-$k][$j];
       
    }
     $k--;
    echo "<br>";
}
$m=count($A[0])-1;
for($i=0;$i<3;$i++){
    for($j=$m;$j<count($A[0]);$j++){
        echo $A[$i][$j];
        
    }
    $m--;
    echo "<br>";
}






?>
