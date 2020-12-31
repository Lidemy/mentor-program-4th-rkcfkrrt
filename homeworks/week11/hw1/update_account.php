<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  $user = NULL;
  //驗證身份與確認 account 類型
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  };
  if (empty($_POST['account']) || $_POST['account']=='選擇新身份') {
    header('Location: back.php?errCode=1');
    die('資料不齊全');
  };

  //更新 account 類型
  $account = $_POST['account'];
  $id = $_POST['id'];
  $stmt = $conn->prepare(
    'UPDATE wendyl_board_users SET account = ? WHERE id = ?'
  );
  $stmt->bind_param('si', $account, $id);
  $result = $stmt->execute();

  if (!$result) {
    die('Error:' . $conn->error);
  }

  header('Location: back.php');
?>
