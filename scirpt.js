const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventContainer = document.querySelector(".add-event-wrapper "),
  addEventCloseBtn = document.querySelector(".close "),
  addEventTitle = document.querySelector(".event-name "),
  addEventFrom = document.querySelector(".event-time-from "),
  addEventTo = document.querySelector(".event-time-to "),
  addEventSubmit = document.querySelector(".add-event-btn ");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "Tháng Một",
  "Tháng Hai",
  "Tháng Ba",
  "Tháng Tư",
  "Tháng Năm",
  "Tháng Sáu",
  "Tháng Bảy",
  "Tháng Tám",
  "Tháng Chín",
  "Tháng Mười",
  "Tháng Mười Một",
  "Tháng Mười Hai",
];

// Khởi tạo danh sách các sự kiện
const eventsArr = [];

// Lấy sự kiện từ Local
function getEvents() {
  const eventsJSON = localStorage.getItem("events");
  // Trống 
  if (eventsJSON !== null) {
    eventsArr.push(...JSON.parse(eventsJSON));
  }
}

getEvents();
console.log(eventsArr);

// Hàm tạo lịch
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";
  // Tạo ngày cho tháng trước
  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  // Kiểm tra xem tháng có sự kiện nào trong ngày đang active không
  for (let i = 1; i <= lastDate; i++) {
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });
    // Kiểm tra xem ngày đang active có phải là ngày hiện tại không
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      if (event) {
        // Hôm nay có sự kiện
        days += `<div class="day today active event">${i}</div>`;
      } else {
        // Hôm nay là ngày thường
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        // Ngày thường có sự kiện
        days += `<div class="day event">${i}</div>`;
      } else {
        // Ngày thường
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  // Điền lịch cho tháng sau
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }

  daysContainer.innerHTML = days;
  addListener();
}

// Hàm cài đặt chuyển đến tháng trước
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}
prev.addEventListener("click", prevMonth);

// Hàm cài đặt chuyển đến tháng sau
function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}
next.addEventListener("click", nextMonth);

initCalendar();

// Hàm để active 1 ngày khi bấm vào ngày đó
function addListener() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      // Get active
      getActiveDay(e.target.innerHTML);
      // Get event của ngày active
      updateEvents(Number(e.target.innerHTML));
      // Đánh dấu là được chọn
      activeDay = Number(e.target.innerHTML);
      // Xoá active của các ngày khác
      days.forEach((day) => {
        day.classList.remove("active");
      });

      // Ngày active là của tháng trước
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        // Ngày active là của tháng sau
        nextMonth();
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

// Hàm chỉ đến ngày hiện tại
todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

// Định dạng cho tháng năm nhập vào
dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

// Cài đặt hàm đi đến ngày chỉ định
function gotoDate() {
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Sai định dạng tháng năm! ");
}

// Lấy ngày active để hiện thị lên interface
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

// Hàm cập nhật danh sách sự kiện cho ngày được active
function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });
  // Không có sự kiện
  if (events === "") {
    events = `<div class="no-event">
            <h3>Rảnh rỗi</h3>
        </div>`;
  }
  eventsContainer.innerHTML = events;

  // Lưu sự kiện vừa tạo mới
  saveEvents();
}

// Nút thêm sự kiện
addEventBtn.addEventListener("click", () => {
  addEventContainer.classList.toggle("active");
});

// Nút huỷ
addEventCloseBtn.addEventListener("click", () => {
  addEventContainer.classList.remove("active");
});

// Giới hạn 60 kí tự của Event Title
addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 60);
});

// Format input cho Event From
addEventFrom.addEventListener("input", (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

// Format input cho Event From
addEventTo.addEventListener("input", (e) => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});

// Chuyển đổi ngày giờ
function convertTime(time) {
  //convert time to 24 hour format
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}

//function to add event to eventsArr
addEventSubmit.addEventListener("click", () => {
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;

  if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
    alert("Điền đầy đủ các trường! ");
    return;
  }

  const timeFromArr = eventTimeFrom.split(":");
  const timeToArr = eventTimeTo.split(":");

  if (
    timeFromArr.length !== 2 ||
    timeToArr.length !== 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59 ||
    timeToArr[0] > 23 ||
    timeToArr[1] > 59
  ) {
    alert("Sai định dạng giờ phút");
    return;
  }

  if (
    timeFromArr[0] * 3600 + timeFromArr[1] * 60 >=
    timeToArr[0] * 3600 + timeToArr[1] * 60
  ) {
    alert("Khoảng thời gian không phù hợp! ");
    return;
  }

  const timeFrom = convertTime(eventTimeFrom);
  const timeTo = convertTime(eventTimeTo);

  const newEvent = {
    title: eventTitle,
    time: timeFrom + " - " + timeTo,
  };

  // Nếu đã có sự kiện trong eventsArr
  let eventAdded = false;
  if (eventsArr.length > 0) {
    eventsArr.forEach((item) => {
      if (
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.events.push(newEvent);
        eventAdded = true;
      }
    });
  }

  // Nếu eventsArr rỗng => tạo mới
  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent],
    });
  }

  // Reset
  addEventContainer.classList.remove("active");
  addEventTitle.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";

  // Hiển thị những sự kiện đã có
  updateEvents(activeDay);

  const activeDayElement = document.querySelector(".day.active");
  if (!activeDayElement.classList.contains("event")) {
    activeDayElement.classList.add("event");
  }
});

// Hàm xoá sự kiện khi click vào sự kiện đó
eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("event")) {
    if (confirm("Bạn muốn xoá sự kiện này không?")) {
      const eventTitle = e.target.children[0].children[1].innerHTML;
      eventsArr.forEach((event) => {
        if (
          event.day === activeDay &&
          event.month === month + 1 &&
          event.year === year
        ) {
          event.events.forEach((item, index) => {
            if (item.title === eventTitle) {
              event.events.splice(index, 1);
            }
          });
          // Khi xoá hết sự kiện, thực hiện gỡ CSS event
          if (event.events.length === 0) {
            eventsArr.splice(eventsArr.indexOf(event), 1);
            //remove event class from day
            const activeDayEl = document.querySelector(".day.active");
            if (activeDayEl.classList.contains("event")) {
              activeDayEl.classList.remove("event");
            }
          }
        }
      });
      updateEvents(activeDay);
    }
  }
});

// Lưu sự kiện vào local
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}