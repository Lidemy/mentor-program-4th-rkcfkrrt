<?php
session_start();
//清除 session
session_destroy();
header("Location: index.php");
exit();
?>
