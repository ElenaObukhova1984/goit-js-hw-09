const bodyRef = document.querySelector('body');
const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');

stopBtnRef.disabled = true;
let timerId = null;

startBtnRef.addEventListener('click', handleStart);
stopBtnRef.addEventListener('click', handleStop);


function handleStart() {
    startBtnRef.disabled = true;
    stopBtnRef.disabled = false;
    timerId = setInterval(() => {
        bodyRef.style.backgroundColor = getRandomHexColor()
    }, 1000);
};

function handleStop() {
  clearTimeout(timerId);
  startBtnRef.disabled = false;
  stopBtnRef.disabled = true;

};


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}