import { Injectable } from "@angular/core";
//import { Socket } from 'ngx-socket-io';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Socket, io } from "socket.io-client";

@Injectable({providedIn: 'root'})
export class SocketIoService {
  socketIo: any;
  constructor() {}

initWs() {
    this.socketIo = io('https://auth-backend.totem.gdn', {
        transports: ['websocket']
    });
}

onWsConnect(): Observable<any> {
  return new Observable<any>(observer => {
    const resultHandler = (data: any) => {
      observer.next({connected: true});
    }
    this.socketIo.on('connect', resultHandler);
  });
}

emitRoomConnection(roomId: string) {
  this.socketIo.emit('connect:room', { room: roomId });
}

emitData(data: any) {
  this.socketIo.emit('events', {...data});
}

onEvents(): Observable<any> {
  return new Observable<any>(observer => {
    const resultHandler = (data: any) => {
        observer.next(data);
    }
    this.socketIo.on('events', resultHandler);
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
