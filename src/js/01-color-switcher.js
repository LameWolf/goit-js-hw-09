const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  timerId: null,
};

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
});

refs.btnStop.addEventListener('click', () => {
  clearInterval(refs.timerId);
  console.log('TimerId has stopped');
});
