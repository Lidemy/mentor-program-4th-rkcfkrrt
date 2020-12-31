<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (empty($_POST['content'])) {
    header('Location: update_comment.php?errCode=1&id='.$_POST['id']);
    die('資料不齊全');
  };

  $username = $_SESSION['username'];
  $id = $_POST['id'];
  $content = $_POST['content'];
  $account = getAccount ($username);

//自己的留言或管理員身份可編輯留言
  if ($username || $account=='admin') {
    $sql = 'UPDATE wendyl_board_comments SET content = ? WHERE id = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $content, $id);
    $result = $stmt->execute();
  } else {
    die('Error:' . $conn->error);
  }

  if (!$result) {
    die('Error:' . $conn->error);
  }

  header('Location: index.php');
?>

