import { Injectable } from '@angular/core';
//import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SocketIoService {
  socketIo: any;
  wsUrl: string = environment.TOTEM_WS_BACKEND_URL;
  socket: any;
  constructor() {}

  /* initWs() {
    this.socketIo = io('https://auth-backend.totem.gdn', {
        transports: ['websocket']
    });
} */
  initWs() {
    this.socket = new WebSocket(
      this.wsUrl
    );
    /*  socket.onopen = function () {
      console.log('Connected');
      socket.send(
        JSON.stringify({
          event: 'events',
          data: { room: 'test' },
        })
      );
      socket.onmessage = function (data) {
        console.log('message: ', data);
      };
    }; */
  }

  onWsConnect(): Observable<any> {
    return new Observable<any>((observer) => {
      const resultHandler = () => {
        console.log('Connected');
        observer.next({ connected: true });
      };
      //this.socketIo.on('connect', resultHandler);
      this.socket.onopen = function () {
        resultHandler();
      };
    });
  }

  emitRoomConnection(roomId: string) {
    this.socket.send(
      JSON.stringify({
        event: 'connect:room',
        data: { room: roomId },
      })
    );
    //this.socketIo.emit('connect:room', { room: roomId });
  }

  emitData(data: any) {
    //this.socketIo.emit('events', {...data});
    this.socket.send(
      JSON.stringify({
        event: 'events',
        data: data,
      })
    );
  }

  onEvents(): Observable<any> {
    return new Observable<any>((observer) => {
      const resultHandler = (data: any) => {
        const res = data.data ? JSON.parse(data.data) : {};
        observer.next(res);
      };
      //this.socketIo.on('events', resultHandler);
      this.socket.onmessage = function (data: any) {
        //console.log('message: ', data);
        console.log('parsed message: ', JSON.parse(data.data));
        resultHandler(data);
      };
    });
  }

  /* listen() {
    this.socketIo.on('events', function(data: any) {
        console.log('event', data);
    });
    this.socketIo.on('disconnect', function() {
        console.log('Disconnected');
    });
} */

  /* connect() {
    this.socket.on('connect', function () {
      console.log('connected!');
    });
    //this.socket.emit('connect:room', { room: 'room-1' });
  }

  listenEvents(): Observable<any> {
    return new Observable<any>(observer => {
      const resultHandler = (data: any) => {
          console.log(data);
          observer.next(data);
      }
      this.socket.on('user:connected', resultHandler);
    });
  }

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }
  getMessage() {
    return this.socket.fromEvent('message').pipe(map((data: any) => data.msg));
  } */
}
