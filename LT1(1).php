
<?php
$name="";
$error="";
if($_SERVER['REQUEST_METHOD']=='POST'){
    $name=trim($_POST["fname"]);
    
    if(empty($name)){
        $error="Can't be empty";
    }
    else if(str_word_count($name) < 2){
    $error = "Must contain at least two words";
}
    else if(!preg_match("/^[a-zA-Z]/",$name)){
          $error="Must start with a string";
    }
    else if(!preg_match("/^[a-zA-Z.\- ]+$/",$name)){
          $error="Can't contain any but  a-z, A-Z, period, dash only";

    }
    else{
       $error= "<h3 style='color:green'>Form submitted successfully!</h3>";
    }
}






?>
<table>
    <tr>
        <td>
        <form method="post" action=<?php echo $_SERVER["PHP_SELF"];?>>
        <fieldset>
            <legend>NAME</legend>
            <table>
                <tr>
                    <td>
                        <input type="text" name="fname" >
                    </td>
                    
                </tr>
                <tr>
                    <td><hr></td>
                </tr>
                <tr>
                    <td>
                        <h5 style="color:red"><?php echo $error; ?></h5>
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