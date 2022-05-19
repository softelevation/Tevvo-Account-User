import SocketIOClient from 'socket.io-client';
import {API_URL} from './config';

class WSService {
  initializeSocket = (userToken, socketName) => {
    try {
      console.log('initializing socket', userToken);
      if (!userToken) {
        console.log('Skipping socket initialization.', 'userToken not found');
        return;
      }
      this.socket = SocketIOClient(API_URL.BASE_URL, {
        transports: ['websocket'],
      });
      this.socket.on('connect', () => {
        this.socket.emit(`${socketName}`, userToken, (data) => {
          console.log(data, '===== socket connected =====', data);
        });
      });
      this.socket.on('disconnect', () => {
        console.log('socket disconnected');
      });

      this.socket.on('connect_error', (err) => {
        // console.log('socket connection error: ', err);
        console.log('socket connection error: ', JSON.stringify(err));
      });

      this.socket.on('error', (err) => {
        // console.log('socket error: ', err);
        console.log('socket error: ', JSON.stringify(err));
      });
    } catch (error) {
      console.log('initialize token error: ', error);
    }
  };

  emit(event, data = {}, acknowldge) {
    console.log('emit: ', acknowldge);
    if (this.socket) {
      this.socket.emit(event, data, acknowldge);
    }
  }
  on(event, cb) {
    console.log('on: ', cb);
    if (this.socket) {
      this.socket.on(event, cb);
    }
  }
  removeListener(listenerName) {
    this.socket.removeListener(listenerName);
  }
  sendMessage(event, data = {}, acknowldge) {
    this.socket.emit(event, data, acknowldge);
  }
  messageFromServer(event, cb) {
    this.socket.on(event, cb);
  }
}

const socketServices = new WSService();

export default socketServices;
