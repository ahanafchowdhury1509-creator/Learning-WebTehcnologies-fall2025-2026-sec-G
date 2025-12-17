<?php
$ms="";
if(($_SERVER["REQUEST_METHOD"]=="POST")){
    if(!empty($_POST['BG'])){
        $ms="<h4 style='color:green'>Submitted</h4>";
        
    }
 
    else{
        $ms="Can't BE EMPTY";
    }
}









?>
<form action="<?php echo $_SERVER["PHP_SELF"]?>" method="post">
<fieldset style="width:240px">
   <legend>BloodGroup</legend>
   <table>
    <tr>
        <td>
            <select name="BG">
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="A-">A-</option>
                <option value="O+">O+</option>
            </select>
        </td>
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