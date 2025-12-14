<?php
$ms="";
if($_SERVER["REQUEST_METHOD"]=="POST"){
    if(isset($_POST["gender"])){
          $ms="Submitted Succesfulyy";
    }
    else{
        $ms="<h5 style='color:red'>Select Gender</h5>";
    }
}


?>
    <table>

        <tr>
            <td>
            <form action=<?php echo $_SERVER["PHP_SELF"];?> method="post">  
                <fieldset>
    <legend>Gender</legend>
            <table>
            <td>
                <label >Male</label>
            </td>
            <td>
                <input type="radio" name="gender" value="male">
            </td>
            <td>
                <label >Female</label>
            </td>
            <td>
                <input type="radio" name="gender" value="female">
            </td>
            <td>
                <label >other</label>
            </td>
            <td>
                
                <input type="radio" name="gender" value="other">
            </td>
        </tr>
        <tr>
            <td colspan="6"><hr></td>
        </tr>
        <tr>
            <td>
                <input type="submit" value="submit">
            </td>
        </tr>
        <tr>
            <td>
                <h5 style="color:green"><?php echo $ms;?></h5>
            </td>
        </tr>
        </table>
        </fieldset>
</form>
        </td>
</tr>
    </table>
