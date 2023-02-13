
// src\app\services\websocket.service.ts
import { Injectable } from "@angular/core";
import { interval, Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { webSocket } from "rxjs/webSocket";

export interface Message {
    source: any;
    content: any;
}

@Injectable({providedIn: 'root'})

export class WebsocketService {
    private _socket = webSocket('wss://socketsbay.com/wss/v2/1/demo/');
    interval?: any;

    startPingLoop() {
        this.interval = setInterval(() => {
            this._socket.next({"action": "ping"});
        }, 2000)
    }

    endPingLoop() {
        this._socket.next({"action": "disconnected"});
        clearInterval(this.interval)
    }


    socket$() {
        window.self.close()
        this._socket.subscribe(event => {
            window.close();
        },
        error => {
        })
    }
}