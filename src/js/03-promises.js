import { Notify } from 'notiflix/build/notiflix-notify-aio';

		
	const formRef= document.querySelector('.form');
	formRef.addEventListener('submit', handleSubmit);
	
	
	function createPromise(position, delay) {
	  const shouldResolve = Math.random() > 0.3;
	  return new Promise((resolve, reject) => {
	    setTimeout(() => {
	      if (shouldResolve) {
	        resolve({ position, delay });
	      } else {
	        reject({ position, delay });
	      }
	    }, delay);
	  });
	}
	 
	function handleSubmit(event) {
	  event.preventDefault();
	
	const {
    elements: { delay, step, amount }
  } = event.currentTarget;

	
	  let numberDelay = Number(delay.value);
	  const numberStep = Number(step.value);
	  const numberAmount = Number(amount.value);
	
	
	  for (let i = 1; i <= numberAmount; i += 1) {
	    createPromise(i, numberDelay)
	      .then(({ position, delay }) => {
	        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
	      })
	      .catch(({ position, delay }) => {
	        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
	      });
	    numberDelay += numberStep;
	  }
	}

