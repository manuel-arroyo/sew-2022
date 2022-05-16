<?php
include 'session.php';
$crud = new Session();

if(isset($_POST["action"])) {
    if($_POST["action"] == "Login") {
        $data =  $crud-> get_user($_POST['username'], $_POST['password']);
        echo $data;
    }

    elseif($_POST["action"] == "Register") {
        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password'];


        $query = "INSERT INTO users (username, email, password) VALUES ('{$username}', '{$email}', '{$password}')";
        $crud->execute_query($query);

        echo "success";
    }

}
