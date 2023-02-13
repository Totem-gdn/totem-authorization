import { Injectable } from '@angular/core';
import { AppComponent } from '../../../app/app.component';


class LocalStorage implements Storage {
  [name: string]: any;
  readonly length!: number;
  clear(): void { }
  getItem(key: string): string | null {
    return null;
  }
  key(index: number): string | null {
    return null;
  }
  removeItem(key: string): void { }
  setItem(key: string, value: string): void { }
}


@Injectable({
  providedIn: 'root'
})
export class BaseStorageService implements Storage {
  local: Storage;
  sesion: Storage;
  constructor() {
    this.local = new LocalStorage();

    this.sesion = new LocalStorage();

    this.local = localStorage;
    this.sesion = sessionStorage;
  }

  [name: string]: any;

  length!: number;

  clear(nameStorage = 'local'): void {
    this[nameStorage].clear();
  }

  getItem(key: string, nameStorage = 'local'): string | null {
    return this[nameStorage].getItem(key);
  }

  key(index: number, nameStorage = 'local'): string | null {
    return this[nameStorage].key(index);
  }

  removeItem(key: string, nameStorage = 'local'): void {
    return this[nameStorage].removeItem(key);
  }

  setItem(key: string, value: string, nameStorage = 'local'): void {
    return this[nameStorage].setItem(key, value);
  }
}
