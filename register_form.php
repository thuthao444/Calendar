<?php

@include 'config.php';
session_start();

if (isset($_POST['submit'])) {

    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $pass = md5($_POST['password']);
    $cpass = md5($_POST['cpass']);

    $select = " SELECT * FROM calendar_form WHERE username = '$username' && password = '$pass'";

    $result = mysqli_query($conn, $select);

    if (mysqli_num_rows($result) > 0) {
        $error[] = 'Tài khoản đã tồn tại !';
    } else {
        if ($pass != $cpass) {
            $error[] = 'Mật khẩu không khớp !';
        } else {
            $insert = "INSERT INTO calendar_form(username, password) VALUES('$username', '$pass')";
            mysqli_query($conn, $insert);
            header('location:login_form.php');
        }
    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng kí - Calendar</title>
    <link rel="stylesheet" href="style_login.css">
</head>

<body>

    <div class="container">
        
        <form id="login" action="" method="post">
            <h1 id="heading1">myCalendar</h1>
            <h2 id="heading2">Đăng kí</h2>

            <div class="user-name">
                <p class="name">Tên đăng nhập</p>
                <input type="text" name="username" placeholder="enter username" required>
            </div>
            <div class="user_pass">
                <p class="name">Mật khẩu</p>
                <input type="password" name="password" placeholder="enter password" required>
            </div>

            <div class="user_pass">
                <p class="name">Nhập lại mật khẩu</p>
                <input type="password" name="cpass" placeholder="repassword" required>
            </div>
            <?php
            if (isset($error)) {
                foreach ($error as $error) {
                    echo '<span class="error-msg">' . $error . '</span>';
                }
            }
            ?>

            <input type="submit" value="Đăng kí" name="submit">

            <p>Đã tạo tài khoản? Đăng nhập <a href="login_form.php">Tại đây</a></p>

        </form>
    </div>

</body>