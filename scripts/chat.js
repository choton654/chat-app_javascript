// adding new chat documents
// setting up a real-time listener to get new chats
// updating the username
// updating the room

class ChatRoom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chat = db.collection('chats');
    this.unsub;
  }
  async addChat(message) {
    const now = new Date();
    const chat = {
      message,
      room: this.room,
      username: this.username,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };
    const res = await this.chat.add(chat);
    return res;
  }
  getChat(callback) {
    this.unsub = this.chat
      .where('room', '==', this.room)
      .orderBy('created_at')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          console.log(change);
          if (change.type === 'added') {
            // update the UI
            callback(change.doc.data());
          }
        });
      });
  }
  updateRoom(room) {
    this.room = room;
    console.log('room updated');
    if (this.unsub) {
      this.unsub();
    }
  }
  updateUsername(username) {
    this.username = username;
    localStorage.setItem('username', username);
  }
}
