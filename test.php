<?php 
    /*
    $name = 'classys.db.iwinv.net';
    $con = array(
        'database' => 'classys',
        'uid' => 'classys',
        'pwd' => '!@zmffotltmdb'
    );
    
    $dbCon = sqlsrv_connect($name, $con);    

    if($dbCon)
    echo "Connected!";
    */
    echo $_POST['test'];
?>

<form action="/test.php?" method="post">
<input type="text" name="test" >
<button type="submit">test</button>
</form>