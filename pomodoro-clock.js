let sessionValue = document.querySelector('.pomodoro__session-value');
let breakValue = document.querySelector('.pomodoro__break-value');
const sessionIncrease = document.querySelector('.pomodoro__session-increase');
const sessionReduce = document.querySelector('.pomodoro__session-reduce');
const breakIncrease = document.querySelector('.pomodoro__break-increase');
const breakReduce = document.querySelector('.pomodoro__break-reduce');
const pomodoroTimer = document.querySelector('.pomodoro__clock');
const startButton = document.querySelector('.pomodoro__button-start');
const stopButton = document.querySelector('.pomodoro__button-stop');
let sumSeconds = 0;
let isSession = true;
let timer;

const countSeconds = (value) => {
  sumSeconds = Number(value.innerHTML) * 60;
}

const increaseSessionValue = () => {
  let newSessionValue = Number(sessionValue.innerHTML);
  sessionReduce.classList.remove('pomodoro__disabled');
  newSessionValue++;
  if (newSessionValue >= 60) {
    newSessionValue = 60;
    sessionIncrease.classList.add('pomodoro__disabled');
  }
  sessionValue.innerHTML = newSessionValue;
  countSeconds(sessionValue);
  changeTimerLength();
}

const reduceSessionValue = () => {
  let newSessionValue = Number(sessionValue.innerHTML);
  sessionIncrease.classList.remove('pomodoro__disabled');
  newSessionValue--;
  if (newSessionValue <= 1) {
    newSessionValue = 1;
    sessionReduce.classList.add('pomodoro__disabled');
  }
  sessionValue.innerHTML = newSessionValue;
  countSeconds(sessionValue);
  changeTimerLength();
}

const increaseBreakValue = () => {
  let newBreakValue = Number(breakValue.innerHTML);
  breakReduce.classList.remove('pomodoro__disabled');
  newBreakValue++;
  if (newBreakValue >= 60) {
    newBreakValue = 60;
    breakIncrease.classList.add('pomodoro__disabled');
  }
  breakValue.innerHTML = newBreakValue;
}

const reduceBreakValue = () => {
  let newBreakValue = Number(breakValue.innerHTML);
  breakIncrease.classList.remove('pomodoro__disabled');
  newBreakValue--;
  if (newBreakValue <= 1) {
    newBreakValue = 1;
    breakReduce.classList.add('pomodoro__disabled');
  }
  breakValue.innerHTML = newBreakValue;
}

const getTimerValue = () => {
  sumSeconds--;
  let minutes = Math.floor(sumSeconds / 60);
  let seconds = sumSeconds % 60;
  setTimerValue(minutes, seconds); 
  if (sumSeconds === 0) {
    let value;
    if (isSession) {
      value = breakValue;
      changeDescription('Relax!', true);
    } else {
      value = sessionValue;
      changeDescription('Work Time!', false);
    }
    countSeconds(value);
    isSession = !isSession;
  }
}

const changeDescription = (message, isRelax) => {
  let description = document.querySelector('.pomodoro__description');
  let pomodoroBox = document.querySelector('.pomodoro__box');
  description.innerHTML = message;
  if (isRelax) {
    pomodoroBox.classList.add('pomodoro__change-background');
  } else {
    pomodoroBox.classList.remove('pomodoro__change-background');
  }
}

const setTimerValue = (min, sec) => {
  if (sec < 10) {
    sec = '0' + sec;
  } 
  pomodoroTimer.innerHTML = min + ':' + sec;
}

const changeTimerLength = () => {
  pomodoroTimer.innerHTML = sessionValue.innerHTML + ':00';
}

const startTimer = () => {
  disableChangeValue();
  timer = setInterval(getTimerValue, 1000);
  startButton.disabled = true;
  stopButton.disabled = false;
}

const stopTimer = () => {
  enableChangeValue();
  clearInterval(timer);
  startButton.disabled = false;
  stopButton.disabled = true;
}

const disableChangeValue = () => {
  sessionIncrease.style.visibility = 'hidden';
  sessionReduce.style.visibility = 'hidden';
  breakIncrease.style.visibility = 'hidden';
  breakReduce.style.visibility = 'hidden';
}

const enableChangeValue = () => {
  sessionIncrease.style.visibility = 'visible';
  sessionReduce.style.visibility = 'visible';
  breakIncrease.style.visibility = 'visible';
  breakReduce.style.visibility = 'visible';
}

countSeconds(sessionValue);
changeTimerLength();
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
sessionIncrease.addEventListener('click', increaseSessionValue);
sessionReduce.addEventListener('click', reduceSessionValue);
breakIncrease.addEventListener('click', increaseBreakValue);
breakReduce.addEventListener('click', reduceBreakValue);
