import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  dateEl: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  timerDays: document.querySelector('span[data-days]'),
  timerHours: document.querySelector('span[data-hours]'),
  timerMins: document.querySelector('span[data-minutes]'),
  timerSecs: document.querySelector('span[data-seconds]'),
};
refs.btnStart.disabled = true;

let dateInputValue = 0;

flatpickr(refs.dateEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  altInput: true,
  altFormat: 'F j, Y',
  dateFormat: 'Y-m-d',

  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future!');
      refs.btnStart.disabled = true;
      dateInputValue = 0;
    } else {
      refs.btnStart.disabled = false;
      dateInputValue = selectedDates[0].getTime();
    }
  },
});

const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }

    const startTime = dateInputValue;
    this.isActive = true;

    refs.btnStart.disabled = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = convertMs(deltaTime);

      if (startTime <= currentTime) {
        this.stop();
        Notify.success('Sale completed!');
        refs.btnStart.disabled = false;
      }

      updateClockface(time);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  },
};

refs.btnStart.addEventListener('click', () => {
  timer.start();
});

const updateClockface = ({ days, hours, minutes, seconds }) => {
  refs.timerDays.textContent = days;
  refs.timerHours.textContent = hours;
  refs.timerMins.textContent = minutes;
  refs.timerSecs.textContent = seconds;
};

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

const convertMs = ms => {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  if (ms < 0) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00' };
  }

  return { days, hours, minutes, seconds };
};
