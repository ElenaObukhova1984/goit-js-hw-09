import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
	

const inputRef = document.querySelector('#datetime-picker');
const startBtnRef = document.querySelector('[data-start]');

const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

startBtnRef.disabled = true;
	
const options = {
	  enableTime: true,
	  time_24hr: true,
	  defaultDate: new Date(),
	  minuteIncrement: 1,
	  onClose(selectedDates) {
	    if (selectedDates[0].getTime() < Date.now()) {
	    Notify.failure("Please choose a date in the future");
	    return;
	    }
		startBtnRef.disabled = false;
	    return;
	  }
	};
	
	const timerDate = flatpickr(inputRef, options);
	
	startBtnRef.addEventListener('click', handleTime)
	
	function handleTime() {
	  if (timerDate.selectedDates[0].getTime() > Date.now()) {
	    inputRef.disabled = true;
		startBtnRef.disabled = true;
	    	
	    const timerId = setInterval(() => {
		const delta = timerDate.selectedDates[0].getTime() - Date.now();
	        
	    timeUpdate(convertMs(delta));
		stop(delta, timerId);
		}, 1000
	    )
	  };
	};
	
	function stop(countTime, timerId) {
	  if (countTime <= 1000) {
	    clearInterval(timerId);
	   		  }
	}

function timeUpdate({ days, hours, minutes, seconds }) {
  daysRef.textContent = addLeadingZero(days);
  hoursRef.textContent = addLeadingZero(hours);
  minutesRef.textContent = addLeadingZero(minutes);
  secondsRef.textContent = addLeadingZero(seconds);
  }
  
const addLeadingZero = value => value.toString().padStart(2, 0);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}