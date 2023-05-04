import { Injectable } from "@angular/core";
//import { Socket } from 'ngx-socket-io';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Socket, io } from "socket.io-client";

@Injectable({providedIn: 'root'})
export class SocketIoService {
  socketIo: any;
  constructor() {}

  init() {
    this.socketIo = io('http://auth-backend.totem.gdn', {
      transports: ['websocket']
    });
  }
  listen() {
    this.socketIo.on('connect', () => {
      console.log('Connected');
      this.socketIo.emit('connect:room', { room: 'room-1' });
      this.socketIo.emit('events', { foo: 'bar' })
    });
    this.socketIo.on('events', function(data: any) {
      console.log('event', data);
      //
    });
    this.socketIo.on('disconnect', function() {
      console.log('Disconnected');
    });
  }


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
