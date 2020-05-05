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
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

// options (comes from qs library)
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const autoScroll = () => {
  // new message
  const newMessage = messages.lastElementChild;

  // get the height of the new message
  const newMessageStyles = getComputedStyle(newMessage);
  const newMessageMargin = parseInt(newMessageStyles.marginBottom);
  const newMessageHeight = newMessage.offsetHeight + newMessageMargin;

  // visible height
  const visibleHeight = messages.offsetHeight;

  // height of messages container
  const containerHeight = messages.scrollHeight;

  // how far have I scrolled?
  const scrollOffset = messages.scrollTop + visibleHeight;

  if (containerHeight - newMessageHeight <= scrollOffset + 1) {
    messages.scrollTop = messages.scrollHeight;
  }
};

// countUpdated is the name we picked on server side
socket.on('welcomeMessage', (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format('h:mm a'),
  });
  messages.insertAdjacentHTML('beforeend', html);
  autoScroll();
});

socket.on('locationMessage', (url) => {
  console.log(url);
  const html = Mustache.render(locationTemplate, {
    username: url.username,
    url: url.url,
    createdAt: moment(url.createdAt).format('h:mm a'),
  });
  messages.insertAdjacentHTML('beforeend', html);
  autoScroll();
});

socket.on('roomData', ({ room, users }) => {
  const html = Mustache.render(sidebarTemplate, {
    room,
    users,
  });

  document.querySelector('#sidebar').innerHTML = html;
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

socket.emit('join', { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = '/';
  }
});
