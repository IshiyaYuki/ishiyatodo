<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <?php
      mb_language("Japanese");
      mb_internal_encoding("UTF-8");
      $to = $_POST['to'];
      $title = $_POST['title'];
      $content = $_POST['todo'];
      $times = $_POST['times'];
      $sub_title[0] ="MY TODOLIST\r\n\r\n";
      $sub_title[1] ="\r\n\r\nThankYou!";
      foreach (array_map(null, $times, $content) as [$val1, $val2]) {
        $arraylist .= $val1.": ".$val2."\r\n";
      }
      $comment = $sub_title[0].$arraylist.$sub_title[1];
      if(mb_send_mail($to, $title, $comment)){
        echo "メールを送信しました！<br/><br/>";
        echo "宛先：$to<br/>","タイトル：$title<br/>","本文：<br/>$comment";
      } else {
        echo "メールの送信に失敗しました......<br/><br/>";
        echo "宛先：$to<br/>","タイトル：$title<br/>","本文：<br/>$comment";
      }
    ?>
  </body>
</html>
