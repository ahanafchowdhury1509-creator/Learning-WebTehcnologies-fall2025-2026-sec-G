<?php
$dob_d="";
$dob_m="";
$dob_y="";
$er="";
if($_SERVER['REQUEST_METHOD']=="POST"){
    $dob_d=$_POST["date"];
    $dob_m=$_POST["month"];
    $dob_y=$_POST["year"];
    if(empty($dob_d)||empty($dob_m)||empty($dob_y)){
        $er="Empty Please Fill Up";
    }
    else if(!(($dob_d>=1 && $dob_d<=31)&&($dob_m>=1 && $dob_m<=12)&&($dob_y>=0 && $dob_y<=2025))){
                  $er="date not valid";
    }
    else{
        $er="<h3 style='color:green'>Valid date!</h3>";
    }
}?>
<table>
    <tr>
<td>
    <form method="post" action=<?php echo $_SERVER["PHP_SELF"];?>>
<fieldset>
    <legend>Date OF Birth</legend>
    <table>
        <tr>
            <td><input type="text" name="date" ></td>
            <td><input type="text" name="month"></td>
            <td><input type="text" name="year"></td>
            
        </tr>
        <tr>
            <td align="center">dd</td>
            <td align="center">mm</td>
            <td align="center">yy</td>
        </tr>
        <tr>
            <td colspan="3">
                <hr>
            </td>
        </tr>
        <tr>
            <td>
                <input type="submit" name="sbtn">
            </td>
        </tr>
        <tr>
            <td>
                <h5 style="color:red"><?php echo $er; ?></h5>
            </td>
        </tr>
    </table>
</fieldset>
  </form>
</td>
    </tr>
</table>
    