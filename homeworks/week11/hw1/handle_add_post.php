<?php
session_start();
require_once('conn.php');
require_once('utils.php');

if (
  empty($_POST['content'])
) {
  header('Location: index.php?errCode=1');
	die('資料不齊全');
}
//新增留言
$user = getUserFromUsername($_SESSION['username']);
$username = $_SESSION['username'];
$content = $_POST['content'];
$sql = "INSERT INTO wendyl_board_comments(username, content) VALUES(?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $username, $content);
$result = $stmt->execute();
if (!$result) {
  die($conn->error);
}

header("Location: index.php");
?>
