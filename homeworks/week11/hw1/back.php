<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
    $account = $user['account'];
  };

  //確認是否管理員
  if ($account !== 'admin') {
    header('Location: index.php?errCode=2');
    die('非管理員身份');
  }

  //分頁
  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $item_per_page = 10;
  $offset = ($page - 1) * $item_per_page;

  $stmt = $conn->prepare(
    'SELECT id, username, account, created_at '.
    'FROM wendyl_board_users '.
    'order by id asc '.
    'limit ? offset ? '
  );
  $stmt->bind_param('ii', $item_per_page, $offset);
  $result = $stmt->execute();

  if (!$result) {
    die('Error:' . $conn->error);
  }
  $result = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8">
  <title>管理後台</title>
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
      <a class="add__btn" href="index.php">回首頁</a>
      <a class="add__btn" href="logout.php">登出</a>
        <h4>你好，<?php echo escape($user['nickname']); ?>！</h4>
        <?php } ?>
    <h2 class="add__comment">使用者帳戶清單</h2>
  </section>
  <section class="table">
    <table class="table__user" border="1">
      <tr>
        <th>id</th>
        <th>username</th>
        <th>created_at</th>
        <th>account</th>
        <th>變更 account</th>
      </tr>
    <?php
      while ($row = $result->fetch_assoc()) {
    ?>
      <tr>
        <td><?php echo escape($row['id']); ?> </td>
        <td><?php echo escape($row['username']); ?> </td>
        <td><?php echo escape($row['created_at']); ?> </td>
        <td><?php echo escape($row['account']); ?> </td>
        <td>
      <form method='POST' action='update_account.php' class="update__account" >
        <select name="account">
          <option>選擇新身份</option>
          <!-- account 類型（一般：normal；停權：suspension；管理員：admin）-->
          <option value="normal">normal</option>
          <option value="suspension">suspension</option>
          <option value="admin">admin</option>
        </select>
        <input type="hidden" name="id" value="<?php echo(escape($row['id']));?>">
        <input type="submit" class="add__btn" value="送出">
      </form></td>
      </tr>
    <?php } ?>
    </table>
  </section>
  <hr/>
  <?php
    $stmt = $conn->prepare(
      'SELECT count(id) AS count FROM wendyl_board_users'
    );
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $count = $row['count'];
    $total_page = ceil($count / $item_per_page);
  ?>
  <div class="page-info">
    <span>共有 <?php echo $count ?> 筆帳戶，頁數：</span>
    <span><?php echo $page ?> / <?php echo $total_page ?>  </span>
  </div>
  <div class="paginator">
    <?php if ($page != 1) { ?>
      <a href="index.php?page=1" class="paginator__list">首頁</a>
      <a href="index.php?page=<?php echo($page - 1) ?>" class="paginator__list" >上一頁</a>
    <?php } ?>
    <?php if ($page != $total_page) { ?>
      <a href="index.php?page=<?php echo($page + 1) ?>" class="paginator__list" >下一頁</a>
      <a href="index.php?page=<?php echo $total_page ?>" class="paginator__list" >尾頁</a>
    <?php } ?>
  </div>
</main>
</body>
</html>
