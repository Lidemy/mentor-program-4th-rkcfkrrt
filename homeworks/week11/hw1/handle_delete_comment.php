<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (empty($_POST['id'])) {
    header('Location: update_comment.php?errCode=1');
    die('資料不齊全');
  };

  $id = $_POST['id'];
  $username = $_SESSION['username'];
  $account = getAccount($username);
//自己的留言或管理員身分可刪除留言
  if ($username) {
    $sql = "UPDATE wendyl_board_comments SET is_deleted = 1 WHERE id = ? AND username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is', $id, $username);
  }

  if ($account == 'admin') {
    $sql = "UPDATE wendyl_board_comments SET is_deleted = 1 WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
  }

  $result = $stmt->execute();

  if (!$result) {
    die('Error:' . $conn->error);
  }
  header('Location: index.php');
?>

