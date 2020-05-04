// this function is needed to connect client side to server
const socket = io();

const form = document.querySelector('#message-form');
const button = document.querySelector('#submit');
const getLocation = document.querySelector('#send-location');
const input = document.querySelector('#input');
const messages = document.querySelector('#messages');

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;

// countUpdated is the name we picked on server side
socket.on('welcomeMessage', (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    message,
  });
  messages.insertAdjacentHTML('beforeend', html);
});

socket.on('locationMessage', (url) => {
  const html = Mustache.render(locationTemplate, {
    url,
  });
  messages.insertAdjacentHTML('beforeend', html);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  button.setAttribute('disabled', 'disabled');

  const message = document.querySelector('#input').value;

  socket.emit('sendMessage', message, (error) => {
    button.removeAttribute('disabled');
    input.value = '';
    // focus will help us write messages one after another
    input.focus();

    if (error) {
      return console.log(error);
    }

    console.log('Message delivered');
  });
});

getLocation.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser');
  }

  getLocation.setAttribute('disabled', 'disabled');

  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);

    socket.emit(
      'sendLocation',
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      (locationMessage) => {
        getLocation.removeAttribute('disabled');
        console.log(locationMessage);
      }
    );
  });
});
