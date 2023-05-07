const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  timerId: null,
};

refs.btnStop.disabled = true;

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
};

refs.btnStart.addEventListener('click', () => {
  refs.timerId = setInterval(() => {
    const newColor = getRandomHexColor();
    document.body.style.backgroundColor = newColor;
    console.log(newColor);
  }, 1000);
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
});

refs.btnStop.addEventListener('click', () => {
  clearInterval(refs.timerId);
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
  console.log('TimerId has stopped');
});
