<?php
  require_once("conn.php");

  function getUserFromUsername ($username) {
    global $conn;
    $sql = "SELECT username FROM wendyl_board_users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $username = $row['username'];

    $sql = "SELECT * FROM wendyl_board_users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row;
  }

  function escape ($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }

  function getAccount ($username) {
    global $conn;
    $stmt2 = $conn->prepare(
      'SELECT account AS account FROM wendyl_board_users WHERE username = ?'
    );
    $stmt2->bind_param('s', $username);
    $result2 = $stmt2->execute();
    $result2 = $stmt2->get_result();
    $row2 = $result2->fetch_assoc();
    $account = $row2['account'];
    return $account;
  }
?>

