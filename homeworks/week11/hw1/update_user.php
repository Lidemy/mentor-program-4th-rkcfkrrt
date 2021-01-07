<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $nickname = $_POST['nickname'];
  $username = NULL;
  $user = NULL;
  //確認身份
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  };
  //確認有輸入新 nickname
  if (empty($_POST['nickname'])) {
    header('Location: index.php?errCode=1');
    die('資料不齊全');
  };
  //更新 nickname
  $stmt = $conn->prepare(
    'UPDATE wendyl_board_users SET nickname = ? WHERE username = ?'
  );
  $stmt->bind_param('ss', $nickname, $username);
  $result = $stmt->execute();

  if (!$result) {
    die('Error:' . $conn->error);
  }
  header('Location: index.php');
  exit();
?>
