const addCero = (n) => {
  if (n.toString().length < 2) return "0".concat(n);
  return n.toString();
};

const changeTime = (number, spans) => {
  const thisNumbers = numbers[number];
  for (let i = 0; i < spans.length; i++) {
    spans[i].classList.remove("clock_numbers--active");
    if (thisNumbers[i] == 1) {
      spans[i].classList.add("clock_numbers--active");
    }
  }
};

const callChange = (numbers, divs) => {
  changeTime(numbers[0], divs[0].children);
  changeTime(numbers[1], divs[1].children);
};

const onDay = (number, divs) => {
  for (let i = 0; i < divs.length; i++) {
    divs[i].classList.remove("clock_days_day--active");
    if(i == number){
      divs[i].classList.add("clock_days_day--active");
    }
  }
};

const amOrPm = (hoursTime) => {
  if (hoursTime >= 12) {
    pm.classList.add("clock_ampm-view");
    am.classList.remove("clock_ampm-view");
  } else {
    pm.classList.remove("clock_ampm-view");
    am.classList.add("clock_ampm-view");
  }
};

const updateTime = () => {
  const time = new Date();
  const day = addCero(time.getDay());
  const hoursTime = addCero(time.getHours());
  const minTime = addCero(time.getMinutes());
  const secTime = addCero(time.getSeconds());

  callChange(hoursTime, hours);
  callChange(minTime, minutes);
  callChange(secTime, seconds);
  onDay(day, week);
  amOrPm(hoursTime);
};

const numbers = {
  0: [1, 0, 1, 1, 1, 1, 1],
  1: [0, 0, 0, 0, 1, 0, 1],
  2: [1, 1, 1, 0, 1, 1, 0],
  3: [1, 1, 1, 0, 1, 0, 1],
  4: [0, 1, 0, 1, 1, 0, 1],
  5: [1, 1, 1, 1, 0, 0, 1],
  6: [1, 1, 1, 1, 0, 1, 1],
  7: [1, 0, 0, 0, 1, 0, 1],
  8: [1, 1, 1, 1, 1, 1, 1],
  9: [1, 1, 1, 1, 1, 0, 1],
};

const hours = document.querySelectorAll(".clock_number_hou .clock_numbers");
const minutes = document.querySelectorAll(".clock_number_min .clock_numbers");
const seconds = document.querySelectorAll(".clock_number_seg .clock_numbers");
const week = document.querySelectorAll(".clock_days_day");
const am = document.querySelector(".am");
const pm = document.querySelector(".pm");

setInterval(updateTime, 100);
updateTime();
