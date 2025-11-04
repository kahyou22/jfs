const clockEl = document.getElementById("clock");

function convert12hours(n) {
  // return n > 12 ? n - 12 : n;
  if (n > 12) {
    n -= 12;
  }
  if (n == 0) {
    n = 12;
  }
  return n;
}

function ampm(n) {
  return n >= 12 ? "pm" : "am";
}

function format02d(n) {
  return n < 10 ? "0" + n : n;
}

function digitalClock() {
  const date = new Date();
  let day;

  // if (date.getDay() == 0) {
  //   day = "일";
  // } else if (date.getDay() == 1) {
  //   day = "월";
  // } else if (date.getDay() == 2) {
  //   day = "화";
  // } else if (date.getDay() == 3) {
  //   day = "수";
  // } else if (date.getDay() == 4) {
  //   day = "목";
  // } else if (date.getDay() == 5) {
  //   day = "금";
  // } else {
  //   day = "토";
  // }

  switch (date.getDay()) {
    case 0:
      day = "일";
      break;
    case 1:
      day = "월";
      break;
    case 2:
      day = "화";
      break;
    case 3:
      day = "수";
      break;
    case 4:
      day = "목";
      break;
    case 5:
      day = "금";
      break;
    default:
      day = "토";
      break;
  }

  let hour = date.getHours();

  let clock = "";
  clock += date.getFullYear() + "년 ";
  clock += date.getMonth() + 1 + "월 ";
  clock += date.getDate() + "일 ";
  clock += "(" + day + ") ";
  clock += ampm(hour) + " " + format02d(convert12hours(date.getHours())) + ":";
  clock += format02d(date.getMinutes()) + ":";
  clock += format02d(date.getSeconds());

  clockEl.innerHTML = clock;
}

digitalClock();
setInterval(digitalClock, 1000);
