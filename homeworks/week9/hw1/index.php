<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  };

  $result = $conn->query("select * from wendyl_board_comments order by id desc");
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
    <?php if (!$username) { ?>
      <a class="add__btn" href="register.php">註冊</a>
      <a class="add__btn" href="login.php">登入</a>
    <?php } else { ?>
      <a class="add__btn" href="logout.php">登出</a>
      <h4>你好，<?php echo $username; ?>！</h4>
    <?php } ?>
    <h2 class="add__comment">Comments</h2>
    <?php
      if (!empty($_GET['errCode'])) {
        $code = $_GET['errCode'];
        $msg = 'Error';
        if ($code === '1') {
          $msg = '資料不齊全';
        }
        echo '<h3 class="error">錯誤：' . $msg . '</h3>';
      }
    ?>
    <form class="add__new-form" method="POST" action="handle_add_post.php">
      <?php if ($username) { ?>
      <textarea class="add__text" name="content" placeholder="請輸入你的留言……"></textarea>            
        <div>
          <input type="submit" value="提交" class="submit" style="width:80px; height:30px;" />
        </div>
      <?php } else { ?>
        <textarea class="add__text" name="content" placeholder="請登入發佈留言"></textarea> 
        <?php } ?>
    </form>
  </section>
  <hr/>
  <section class="commentarea">
    <?php
      while ($row = $result->fetch_assoc()) {
    ?>  
        <div class="area__comment" row="5">
          <img src="P.jpg" class="area__logo">
          <div class="area__words">
            <div class="area__data">
              <span class="area__nickname">
                <?php echo $row['nickname']; ?>
              </span>
              <span class="time">
                <?php echo $row['created_at']; ?>
              </span>
            </div>
            <div class="area__text"><?php echo $row['content']; ?></div>
          </div>
        </div>
    <?php } ?>    
  </section>
</main>
</body>
</html>