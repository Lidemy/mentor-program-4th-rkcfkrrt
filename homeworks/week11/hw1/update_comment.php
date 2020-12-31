<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $id = $_POST['id'];
  $username = NULL;
  $user = NULL;
  //確認身份
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  };
  //取出要編輯的 comment
  $stmt = $conn->prepare(
    'SELECT * FROM wendyl_board_comments WHERE id = ?'
  );
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();

  if (!$result) {
    die('Error:' . $conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8">
  <title>編輯留言</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class = warning>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</div>
<main class="wrapper">
  <section class="add">
    <?php if ($username) { ?>
      <a class="add__btn" href="logout.php">登出</a>
      <a class="add__btn" href="index.php">回留言板</a>
        <h4>你好，<?php echo escape($user['nickname']); ?>！</h4>
        <?php } ?>
    <h2 class="add__comment">編輯留言</h2>
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
    <form class="add__new-form" method="POST" action="handle_update_comment.php">
      <textarea class="add__text" name="content"><?php echo $row['content']?></textarea>
      <input type="hidden" name="id" value="<?php echo(escape($row['id']));?>">
      <input type="submit" value="提交" class="submit" />
    </form>
  </section>
  <hr/>
</main>
</body>
</html>
