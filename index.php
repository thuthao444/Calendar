<?php

@include 'config.php';

session_start();

if(!isset($_SESSION['username'])){
   header('location:login_form.php');
}

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
      integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <title>ProjectCalendar</title>
  </head>
  <body>
    <div class="sidebar">
      <div class="content">
        <div class="logo-holder logo">
          <h3>myCalendar</h3>
        </div>
        <p>Chào mừng đến myCalendar, </p>
        <p><span><?php echo $_SESSION['username']; ?></span></p>
        <a href="logout.php" class="logout">Đăng xuất</a>
      </div>
    </div>
    <div class="container">
      <div class="left">
        <div class="calendar">
          <div class="month">
            <i class="fa fa-angle-left prev"></i>
            <div class="date"></div>
            <i class="fa fa-angle-right next"></i>
          </div>
          <div class="weekdays">
            <div>CN</div>
            <div>Hai</div>
            <div>Ba</div>
            <div>Tư</div>
            <div>Năm</div>
            <div>Sáu</div>
            <div>Bảy</div>
          </div>
          <div class="days"></div>
          <div class="goto-today">
            <div class="goto">
              <input type="text" placeholder="mm/yyyy" class="date-input" />
              <button class="goto-btn">Đi</button>
            </div>
            <button class="today-btn">Hôm nay</button>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="today-date">
          <div class="event-day">Web</div>
          <div class="event-date">17 November 2023</div>
        </div>
        <div class="events"></div>
        <div class="add-event-wrapper">
          <div class="add-event-header">
            <div class="title">Thêm sự kiện</div>
            <i class="fas fa-times close"></i>
          </div>
          <div class="add-event-body">
            <div class="add-event-input">
              <input type="text" placeholder="Tên sự kiện" class="event-name" />
            </div>
            <div class="add-event-input">
              <input
                type="text"
                placeholder="Bắt đầu từ"
                class="event-time-from"
              />
            </div>
            <div class="add-event-input">
              <input
                type="text"
                placeholder="Kết thúc vào"
                class="event-time-to"
              />
            </div>
          </div>
          <div class="add-event-footer">
            <button class="add-event-btn">Thêm</button>
          </div>
        </div>
      </div>
      <button class="add-event">
        <i class="fas fa-plus"></i>
      </button>
    </div>
    <script src="script.js"></script>
  </body>
</html>