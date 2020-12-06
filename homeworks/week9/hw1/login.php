<?php
  require_once("conn.php");

  $result = $conn->query("select * from comments order by id desc");
  if (!$result) {
    die('Error:' . $conn->error);
  }

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>board</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
<div class = warning>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</div>
<main class="wrapper">
  <section class="add">
    <a class="add__btn" href="index.php">回留言板</a>
    <a class="add__btn" href="register.php">註冊</a>
    <h2 class="add__comment">登入</h2>
    <?php
      if (!empty($_GET['errCode'])) {
        $code = $_GET['errCode'];
        $msg = 'Error';
        if ($code === '1') {
          $msg = '資料不齊全';
        } else if ($code === '2') {
          $msg = '帳號或密碼輸入錯誤';
        }
        echo '<h3 class="error">錯誤：' . $msg . '</h3>';
      }
    ?>
    <form class="add__new-form" method="POST" action="handle_login.php">   
      <div>
        <span>帳號：</span>
        <input class="add__info" name="username" />
      </div>
      <div>
        <span>密碼：</span>
        <input class="add__info" name="password" type="password" />
      </div>
      <div>
        <input type="submit" value="提交" class="submit" style="width:80px; height:30px;" />
      </div>
    </form>
  </section>
</main>
</body>
</html>
