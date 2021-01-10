<?php
session_start();
require_once('conn.php');
require_once('utils.php');

//確認帳號密碼有無輸入
if (
  empty($_POST['username']) ||
  empty($_POST['password'])
  ) {
  header('Location: login.php?errCode=1');
	die('資料不齊全');
}

$username = $_POST['username'];
$password = $_POST['password'];

//檢查有無符合的 username
$sql = "SELECT * FROM wendyl_board_users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $username);
$result = $stmt->execute();
if (!$result) {
  die($conn->error);
}

$result = $stmt->get_result();
if ($result->num_rows === 0) {
  header("Location: login.php?errCode=2");
  die('查無此帳號');
}
//檢查密碼
$row = $result->fetch_assoc();
if (password_verify($password, $row['password'])){
  $_SESSION['username'] = $username;
  header("Location: index.php");
  exit();
} else {
  header("Location: login.php?errCode=2");
  die('密碼錯誤');
}
?>

