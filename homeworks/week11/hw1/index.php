<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  $user = NULL;
  $account = NULL;
  //驗證身分與確認 account 類型（一般：normal；停權：suspension；管理員：admin）
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
    $account = getAccount ($username);
  };

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $item_per_page = 5;
  $offset = ($page - 1) * $item_per_page;

  $stmt = $conn->prepare(
    'SELECT U.nickname AS nickname, '.
      'U.username AS username, '.
      'U.account AS account, '.
      'C.id AS id, '.
      'C.created_at AS created_at, '.
      'C.content AS content '.
    'from wendyl_board_comments AS C '.
    'LEFT JOIN wendyl_board_users AS U ON C.username = U.username '.
    'WHERE  C.is_deleted is NULL '.
    'ORDER BY C.id DESC '.
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
    <?php } else {
      if($account == 'admin') { ?>
        <a class="add__btn" href="back.php">管理後台</a>
      <?php }; ?>
      <a class="add__btn" href="logout.php">登出</a>
      <span class="btn__new-nickname">編輯暱稱</span>
      <form method='POST' action='update_user.php' class="add__new-nickname hide" >
        新暱稱：<input type="text" name="nickname" >
        <input type="submit" class="add__btn" value="送出" >
      </form>
        <h4>你好，<?php echo escape($user['nickname']); ?>！</h4>
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
      <?php if ($username) {
        if($account !== 'suspension') { ?>
            <textarea class="add__text" name="content" placeholder="請輸入你的留言……"></textarea>
            <input type="submit" value="提交" class="submit" style="width:80px; height:30px;" />
          <?php } else { ?>
            <textarea class="add__text" name="content" placeholder="停權中，無法發佈留言。"></textarea>
          <?php };
      } else { ?>
        <textarea class="add__text" name="content" placeholder="請登入發佈留言"></textarea>
      <?php } ?>
    </form>
  </section>
  <hr/>
  <section class="commentarea">
  <!-- 輸出所有 comments -->
    <?php while ($row = $result->fetch_assoc()) { ?>
      <div class="area__comment" row="5">
          <img src="P.jpg" class="area__logo">
          <div class="area__words">
            <div class="area__data">
              <span class="area__nickname">
                <?php echo escape($row['nickname']); ?>
                （@<?php echo escape($row['username']);?>）
              </span>
              <span class="time">
                <?php echo escape($row['created_at']); ?>
              </span>
              <!-- 管理員身份或自己的留言可進行編輯與刪除 -->
              <?php if ($account == 'admin') { ?>
                <form class="area__edit" method="POST" action="update_comment.php">
                  <input type="hidden" name="id" value="<?php echo(escape($row['id']));?>">
                  <input class="area__btn" type="submit" class="admin-post__btn" value="編輯">
                </form>
                <form class="area__edit" method="POST" action="handle_delete_comment.php">
                  <input type="hidden" name="id" value="<?php echo(escape($row['id']));?>">
                  <input class="area__btn" type="submit" class="admin-post__btn" value="刪除">
                </form>
                <?php } else {
                  if ($row['username'] === $username) { ?>
                <form class="area__edit" method="POST" action="update_comment.php">
                  <input type="hidden" name="id" value="<?php echo(escape($row['id']));?>">
                  <input class="area__btn" type="submit" class="admin-post__btn" value="編輯">
                </form>
                <form class="area__edit" method="POST" action="handle_delete_comment.php">
                  <input type="hidden" name="id" value="<?php echo(escape($row['id']));?>">
                  <input class="area__btn" type="submit" class="admin-post__btn" value="刪除">
                </form>
              <?php }} ?>
            </div>
            <div class="area__text"><?php echo escape($row['content']); ?></div>
          </div>
        </div>
    <?php } ?>
  </section>
  <hr/>
  <?php
  //計算有效留言數量與頁數
    $stmt = $conn->prepare(
      'SELECT count(id) AS count FROM wendyl_board_comments WHERE is_deleted IS NULL'
    );
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $count = $row['count'];
    $total_page = ceil($count / $item_per_page);
  ?>
  <div class="page-info">
    <span>共有 <?php echo $count ?> 筆留言，頁數：</span>
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
<script>
//監聽「編輯暱稱」按鈕
  var element = document.querySelector(".btn__new-nickname");
  element.addEventListener('click', function (event) {
    var btn = document.querySelector(".add__new-nickname");
    btn.classList.toggle("hide");
  })
</script>
</body>
</html>
