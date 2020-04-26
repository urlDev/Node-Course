const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.innerText = 'Loading...';
  messageTwo.innerText = '';

  fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        messageOne.innerText = `${data.error}`;
      } else {
        messageOne.innerText = `${data.location}`;
        messageTwo.innerText = `${data.forecastData}`;
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
});
