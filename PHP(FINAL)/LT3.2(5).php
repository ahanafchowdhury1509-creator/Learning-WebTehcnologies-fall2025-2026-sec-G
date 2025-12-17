<?php
$ms="";
if(($_SERVER["REQUEST_METHOD"]=="POST")){
    if(empty($_POST["deg"])){
        $ms="Can't BE EMPTY";
    }
    else if(count($_POST["deg"])<2){
         $ms="LESS THAN 2 SELECTED";
    }
    else{
        $ms="<h4 style='color:green>Submitted</h4>'";
    }
}









?>
<form action=<?php echo $_SERVER["PHP_SELF"]?> method="post">
<fieldset style="width:240px">
   <legend>DEGREE</legend>
   <table>
    <tr>
        <td><input type="checkbox" name="deg[]"></td>
        <td>SSC</td>
        <td><input type="checkbox" name="deg[]"></td>
        <td>HSC</td>
        <td><input type="checkbox" name="deg[]"></td>
        <td>BSC</td>
        <td><input type="checkbox" name="deg[]"></td>
        <td>MSC</td>
    </tr>
    <tr>
        <td colspan="8"><hr></td>
    </tr>
    <tr>
        <td colspan="8">
            <input type="submit" value="submit">
        </td>
    </tr>
    <tr>
        <td colspan="8"> <h4 style="color:red"><?php echo $ms;?></h4></td>
    </tr>
   </table>
</fieldset>

</form>
