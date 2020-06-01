// dom queries
const chatlist = document.querySelector('.chat-list');
const chatForm = document.querySelector('.new-chat');
const chatname = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-mssg');
const chatRooms = document.querySelector('.chat-rooms');

// add a new chat
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = chatForm.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => chatForm.reset())
    .catch((err) => console.log(err));
});

// update username
chatname.addEventListener('submit', (e) => {
  e.preventDefault();

  // update name via chatroom
  const newName = chatname.name.value.trim();
  chatroom.updateUsername(newName);

  // reset the form
  chatname.reset();

  // show and hide the update message
  updateMsg.innerText = `your name is changed to ${newName}`;
  setTimeout(() => {
    updateMsg.innerText = ``;
  }, 3000);
});

// check localstorage for username
const username = localStorage.getItem('username')
  ? localStorage.getItem('username')
  : 'none';

//update chatroom
chatRooms.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    chatui.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChat((chat) => chatui.render(chat));
  }
});

// chat instances
const chatroom = new ChatRoom('general', username);
const chatui = new ChatUI(chatlist);

// get chat and render
chatroom.getChat((data) => {
  chatui.render(data);
});
