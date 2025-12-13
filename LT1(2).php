
<?php
$em="";
$error="";
if($_SERVER['REQUEST_METHOD']=='POST'){
    $em=trim($_POST["femail"]);
    
    if(empty($em)){
        $error="Can't be empty";
    }
    else if(!preg_match("/^[a-zA-Z0-9>_%+_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/",$em)){
          $error="Not a valid email";

    }
    else{
       $error= "<h3 style='color:green'>Valid Mail!</h3>";
    }
}






?>
<table>
    <tr>
        <td>
        <form method="post" action=<?php echo $_SERVER["PHP_SELF"];?>>
        <fieldset>
            <legend>EMAIL</legend>
            <table>
                <tr>
                    <td>
                        <input type="text" name="femail" >
                    </td>
                    
                </tr>
                <tr>
                    <td><hr></td>
                </tr>
                <tr>
                    <td>
                        <h5 ><?php echo $error; ?></h5>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="submit" value="submit" >
                    </td>
                    
                </tr>
            </table>   
        </fieldset>
        </form>
        </td>
    </tr>
</table>